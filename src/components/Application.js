
import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment";
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";




export default function Application(props) {


  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  
  
  const interviewers = getInterviewersForDay(state, state.day);
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  

  const appointmentsArray = dailyAppointments.map((appointmentObj) => {

    const interview = getInterview(state, appointmentObj.interview);

    return (
      <Appointment
        key={appointmentObj.id}
        // id={appointmentObj.id}
        // time={appointmentObj.time}
        // interview={appointmentObj.interview}
        {...appointmentObj}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
            days={state.days}
            day={state.day}
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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
