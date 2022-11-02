import React from "react";
import DayListItem from "components/DayListItem";





export default function DayList(props) {

  const days = props.days.map((dayListItem) => {

    return (
      <DayListItem
        key={dayListItem.id}
        name={dayListItem.name}
        spots={dayListItem.spots}
      />
    );
    })

    return (
      <ul>{days}</ul>
    );
  }
