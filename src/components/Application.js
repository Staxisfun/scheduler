
import React, { useEffect, useState } from "react";
import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "./Appointment";
import Axios from "axios";




const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};



export default function Application(props) {
  
  // const [day, setDay] = useState("");
  // const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: "Monday",
    days: []
    // appointments: {}
  });


  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState(prev => ({ ...prev, days }));
  
  
  useEffect(() => {
    const daysApi = "api/days";
    Axios.get(daysApi).then(response => {
      setDays(response.data)
    })
  }, [])
  
  
  const appointmentsArray = Object.values(appointments).map((appointmentObj) => {

    return (
      <Appointment
        key={appointmentObj.id}
        // id={appointmentObj.id}
        // time={appointmentObj.time}
        // interview={appointmentObj.interview}
        {...appointmentObj}
      />
    );
  });
  
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            // days={days}
            // value={day}
            days={state.days}
            day={state.day}
            // onChange={setDay}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsArray}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
