import React from "react";
import TimelineRow from "./TimelineRow";
import TimelineRepository from "./TimelineRepository";

const Timeline = () => {
  const timelineRepo = new TimelineRepository();
  return (
    <>
      {timelineRepo.getAll().map((transaction, i) => {
        return (
          <TimelineRow key={`${i}_transactionRow`} timelineData={transaction} />
        );
      })}
    </>
  );
};

export default Timeline;
