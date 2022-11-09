import { useEffect, useState } from "react";
import Axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });




  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => setState(prev => ({ ...prev, days }));


  useEffect(() => {
    Promise.all([
      Axios.get('api/days'),
      Axios.get('api/appointments'),
      Axios.get('api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  
  
  const updateSpots = function (state, appointments) {
    return state.days.map((day) => {
      if (day.name === state.day) {
        return {
          ...day,
          spots: day.appointments
          .map((id) => (appointments[id]))
          .filter(({interview}) => {
            return !interview
          }).length
        };
      }
      return day
    });
  };
  
  
  function bookInterview(id, interview) {
    console.log(id, interview);
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview } //null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //delete request
    return Axios.put(`/api/appointments/${id}`, {interview})
      .then((res) => {
        setState({ ...state, appointments, days: updateSpots(state, appointments) })
      })
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
    
    //delete request
    return Axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      setState({ ...state, appointments, days: updateSpots(state, appointments) })
    })
  }


  
  const test = ({ ...state.days[0] })    
  console.log("test.spots")
  console.log(test.spots)
  
      
  
  
  
  
      return {state, setDay, bookInterview, cancelInterview}
  
  }


  // spots are shown in /api/days -> days object

  // console.log("days:")
  // console.log(state.days[0])
  
  
// calculate #of spots in /api/appointments -> appointment.interview = null === #of spots that day
  // console.log("appointments");
  // console.log(state.appointments[1]);
  // console.log(state.appointments[2]);
  // console.log(state.appointments[3]);
  // console.log(state.appointments[4]);
  // console.log(state.appointments[5]);
  


// update spots when appointment is booked or cancelled -> to be done in bookInterview and cancelInterview -> .then

  //  bookInterview -> NEW name/interviewer id -> POST -> .then() -> return to FRONTEND - update schedule

  //  cancelInterview -> EXISTING name/interviewerid -> POST .then() -> return to FRONTEND -> update schedule




// The appointment id is known when an interview is confirmed or canceled by the server.
// Changes should be limited to the useApplicationData.js file.












