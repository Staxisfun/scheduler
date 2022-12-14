import { useEffect, useState } from "react";
import Axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });


  const setDay = (day) => setState({ ...state, day });



  useEffect(() => {
    Promise.all([
      Axios.get('/api/days'),
      Axios.get('/api/appointments'),
      Axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []

  );


  //updates remaining interview spots for a day when an interview is booked or cancelled
  const updateSpots = function (state, appointments) {
    return state.days.map((day) => {
      if (day.name === state.day) {
        return {
          ...day,
          spots: day.appointments
            .map((id) => (appointments[id]))
            .filter(({ interview }) => {
              return !interview;
            }).length
        };
      }
      return day;
    });
  };


  function bookInterview(id, interview) {


    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return Axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({ ...state, appointments, days: updateSpots(state, appointments) });
      });
  }


  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return Axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        setState({ ...state, appointments, days: updateSpots(state, appointments) });
      });
  }



  return { state, setDay, bookInterview, cancelInterview };

}













