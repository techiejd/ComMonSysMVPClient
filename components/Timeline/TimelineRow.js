import React from "react";
import { View, StyleSheet } from "react-native";
import TransactionRow from "./TransactionRow";
import CommunityMessageRow from "./CommunityMessageRow";

/*

{
  type: "community_message" || "transaction",
  timestamp: DateTime,
  ...
}

*/

const TimelineRow = ({ timelineData }) => {
  switch (timelineData.type) {
    case "transaction":
      return (
        <TransactionRow
          transactionType={timelineData.transactionType}
          timestamp={timelineData.timestamp}
          address={timelineData.address}
          amount={timelineData.amount}
          ticker={timelineData.ticker}
        />
      );
    case "community_message":
      return (
        <CommunityMessageRow
          message={timelineData.message}
          community={timelineData.community}
          timestamp={timelineData.timestamp}
        />
      );
    default:
      return <View />;
  }
};

export default TimelineRow;

const styles = StyleSheet.create({});
