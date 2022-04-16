import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import TransactionRow from "./TransactionRow";
import CommunityMessageRow from "./CommunityMessageRow";
import { TimelineDatum } from "../../providers/TimelineProvider";

const TimelineRow: FC<{ timelineDatum: TimelineDatum }> = ({
  timelineDatum,
}) => {
  switch (timelineDatum.type) {
    case "transaction":
      return <TransactionRow transaction={timelineDatum} />;
    case "community_message":
      return <CommunityMessageRow communityMessage={timelineDatum} />;
    default:
      return <View />;
  }
};

export default TimelineRow;

const styles = StyleSheet.create({});
