import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import { BlockchainContext } from "./BlockchainProvider";

/*
TimelineObject
{
  type: transaction || community message,
  timestamp: DateTime,
  ...
}

*/

const TimelineContext = React.createContext();

const TimelineProvider = ({ children }) => {
  const now = new moment();

  const [timelineData, setTimelineData] = useState([]);
  const { signer, communityCoinContract, convert } =
    useContext(BlockchainContext);

  const getTransactionsTimelineData = async () => {
    const getTransactionsByDirection = async (direction) => {
      const transactionArgsIndices = {
        from: 0,
        to: 1,
        amount: 2,
      };
      fromUserFilter = communityCoinContract.filters.Transfer(signer.address);
      toUserFilter = communityCoinContract.filters.Transfer(
        null,
        signer.address
      );
      directionalArgs =
        direction == "to"
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
      transactionEvents = await communityCoinContract.queryFilter(
        directionalArgs.filter
      );
      return transactionEvents.map(async (txE) => {
        // Must capture the data we want before await.
        const transactionType = directionalArgs.type;
        const address = txE.args[directionalArgs.addressIndex];
        const b = await txE.getBlock();
        const t = moment.unix(b.timestamp);
        const transactionTimelineDatum = {
          type: "transaction",
          transactionType: transactionType,
          timestamp: t.format("MMM D") + " at " + t.format("HH:mm"),
          address: address,
          amount: convert({
            to: "peso",
            from: "wei",
            amount: txE.args[transactionArgsIndices.amount],
          }),
          ticker: "PBC",
        };
        return transactionTimelineDatum;
      });
    };
    const toTransactions = await getTransactionsByDirection("to");
    const fromTransactions = await getTransactionsByDirection("from");
    return Promise.all(toTransactions.concat(fromTransactions));
  };

  useEffect(() => {
    const load = () => {
      getTransactionsTimelineData().then((txTData) => setTimelineData(txTData));
    };
    load();
  }, []);

  return (
    <TimelineContext.Provider value={{ timelineData }}>
      {children}
    </TimelineContext.Provider>
  );
};

export default TimelineProvider;
export { TimelineContext };
