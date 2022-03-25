import React from "react";
import moment from "moment";
import TimelineRow from "./TimelineRow";

const Timeline = () => {
  const now = new moment();
  const dummyTransactions = [
    {
      transactionType: "Send",
      timestamp: now.format("MMM D") + " at " + now.format("HH:mm"),
      address: "0xCca2bd5957073026b56Cdaaeb282AD4a61619a3a",
      amount: 10,
      ticker: "PBC",
    },
    {
      transactionType: "Receive",
      timestamp: now.format("MMM D") + " at " + now.format("HH:mm"),
      address: "0xCca2bd5957073026b56Cdaaeb282AD4a61619a3a",
      amount: 40,
      ticker: "PBC",
    },
  ];

  return (
    <>
      {dummyTransactions.map((transaction, i) => {
        return (
          <TimelineRow
            key={`${i}_transactionRow`}
            transactionType={transaction.transactionType}
            timestamp={transaction.timestamp}
            address={transaction.address}
            amount={transaction.amount}
            ticker={transaction.ticker}
          />
        );
      })}
    </>
  );
};

export default Timeline;
