import React from "react";
import DayListItem from "components/DayListItem";





export default function DayList(props) {

  const days = props.days.map((day) => {

    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        setDay={props.setDay}
        selected={props.day === day.name}
      />
    );
  });

  return (
    <ul>{days}</ul>
  );
}
