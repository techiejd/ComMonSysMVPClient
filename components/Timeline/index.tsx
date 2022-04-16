import React, { useContext } from "react";
import TimelineRow from "./TimelineRow";
import {
  TimelineContext,
  ITimelineContext,
} from "../../providers/TimelineProvider";

const Timeline = () => {
  const { timelineData } = useContext(TimelineContext) as ITimelineContext;
  return (
    <>
      {timelineData.map((timelineDatum, i) => {
        return (
          <TimelineRow key={`${i}_timelineRow`} timelineDatum={timelineDatum} />
        );
      })}
    </>
  );
};

export default Timeline;
