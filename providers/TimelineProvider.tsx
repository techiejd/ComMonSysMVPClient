import React, { useState, useContext, useEffect, FC } from "react";
import moment from "moment";
import { BlockchainContext, IBlockchainContext } from "./BlockchainProvider";
import { VoteStoreContext, IVoteStoreContext } from "./VoteStoreProvider";
import { EventFilter, Event, BigNumberish } from "ethers";

type TransactionTimelineDatum = {
  type: "transaction";
  timestamp: string;
  transactionType: "Receive" | "Send";
  address: string;
  amount: string;
  ticker: "PBC";
};

type CommunityMessageTimelineDatum = {
  type: "community_message";
  timestamp: string;
  message: string;
  community: string;
};

type TimelineDatum = TransactionTimelineDatum | CommunityMessageTimelineDatum;

interface ITimelineContext {
  timelineData: TimelineDatum[];
}

const TimelineContext = React.createContext<ITimelineContext | undefined>(
  undefined
);

// TODO(techiejd): Remove this hard coded values.
//t.format("MMM D") + " at " + t.format("HH:mm")
const now = moment.unix(moment.now());
const fakeTimestamp = now.format("MMM D") + " at " + now.format("HH:mm");
const messages: Array<CommunityMessageTimelineDatum> = [
  {
    timestamp: fakeTimestamp,
    community: "Poblado",
    message: "Muchas gracias por tu voto, juntos creamos comunidad",
    type: "community_message",
  },
  {
    timestamp: fakeTimestamp,
    community: "Poblado",
    message: "Muchas gracias por tu voto, juntos creamos comunidad",
    type: "community_message",
  },
  {
    timestamp: fakeTimestamp,
    community: "Poblado",
    message: "Muchas gracias por tu voto, juntos creamos comunidad",
    type: "community_message",
  },
];

const TimelineProvider: FC = ({ children }) => {
  const [timelineData, setTimelineData] = useState(new Array<TimelineDatum>());
  const { wallet, communityCoinContract, convert } = useContext(
    BlockchainContext
  ) as IBlockchainContext;
  const { vote } = useContext(VoteStoreContext) as IVoteStoreContext;

  const updateTimelineData = (timelineDatum: TimelineDatum) => {
    setTimelineData((prevTimelineData: TimelineDatum[]) => [
      timelineDatum,
      ...prevTimelineData,
    ]);
  };

  const transactionArgsIndices = {
    from: 0,
    to: 1,
    amount: 2,
  };

  type Direction = "to" | "from";
  type DirectionalArgs = {
    addressIndex: number;
    filter: EventFilter;
    type: string;
  };

  const getDirectionalArgsFor = (direction: Direction): DirectionalArgs => {
    const fromUserFilter = communityCoinContract.filters.Transfer(
      wallet?.address
    );
    const toUserFilter = communityCoinContract.filters.Transfer(
      null,
      wallet?.address
    );
    return direction == "to"
      ? {
          addressIndex: transactionArgsIndices.from,
          filter: toUserFilter,
          type: "Receive",
        }
      : {
          addressIndex: transactionArgsIndices.to,
          filter: fromUserFilter,
          type: "Send",
        };
  };
  const transform = async (
    txEvent: Event,
    directionalArgs: DirectionalArgs
  ) => {
    // Must capture the data we want before await.
    const transactionType = directionalArgs.type;
    const address = txEvent.args?.[directionalArgs.addressIndex];
    const b = await txEvent.getBlock();
    const t = moment.unix(b.timestamp);
    const TransactionTimelineDatum = {
      type: "transaction" as const,
      transactionType: transactionType as "Receive" | "Send",
      timestamp: t.format("MMM D") + " at " + t.format("HH:mm"),
      address: address as string,
      amount: convert({
        to: "pretty_peso",
        amount: txEvent.args?.[transactionArgsIndices.amount],
      }) as string,
      ticker: "PBC" as const,
    };
    return TransactionTimelineDatum;
  };

  const getTransactionsTimelineData = async (): Promise<
    TransactionTimelineDatum[]
  > => {
    const getTransactionsByDirection = async (direction: Direction) => {
      const directionalArgs = getDirectionalArgsFor(direction);
      const transactionEvents = await communityCoinContract.queryFilter(
        directionalArgs.filter
      );
      return transactionEvents.map((txE) => transform(txE, directionalArgs));
    };
    const toTransactions = await getTransactionsByDirection("to");
    const fromTransactions = await getTransactionsByDirection("from");
    const allTransactions = toTransactions.concat(fromTransactions);
    return Promise.all(allTransactions);
  };

  useEffect(() => {
    const load = () => {
      getTransactionsTimelineData().then((txTData) => {
        txTData.reverse(); // node hands them in ascending order
        setTimelineData((prevState: TimelineDatum[]) => [
          ...prevState,
          ...txTData,
        ]);
      });
      const toDirectionalArgs = getDirectionalArgsFor("to");
      const fromDirectionalArgs = getDirectionalArgsFor("from");
      communityCoinContract.on(
        fromDirectionalArgs.filter,
        (to, from, amount, fullEvent) => {
          transform(fullEvent, fromDirectionalArgs).then((txTimelineDatum) => {
            updateTimelineData(txTimelineDatum);
          });
        }
      );
      communityCoinContract.on(
        toDirectionalArgs.filter,
        (to, from, amount, fullEvent) => {
          transform(fullEvent, toDirectionalArgs).then((txTimelineDatum) => {
            updateTimelineData(txTimelineDatum);
          });
        }
      );
    };
    if (wallet != null) load();
  }, [wallet]);

  useEffect(() => {
    if (vote != null) {
      updateTimelineData(messages[vote]);
    }
  }, [vote]);

  return (
    <TimelineContext.Provider value={{ timelineData }}>
      {children}
    </TimelineContext.Provider>
  );
};

export default TimelineProvider;
export {
  TimelineContext,
  ITimelineContext,
  TimelineDatum,
  TransactionTimelineDatum,
  CommunityMessageTimelineDatum,
};
