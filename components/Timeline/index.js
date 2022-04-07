import React, { useContext } from "react";
import TimelineRow from "./TimelineRow";
import { TimelineContext } from "../../providers/TimelineProvider";

const Timeline = () => {
  const { timelineData } = useContext(TimelineContext);
  return (
    <>
      {timelineData.map((timelineDatum, i) => {
        return (
          <TimelineRow key={`${i}_timelineRow`} timelineData={timelineDatum} />
        );
      })}
    </>
  );
};

export default Timeline;
