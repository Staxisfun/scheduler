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
        setState({ ...state, appointments })
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
      setState({ ...state, appointments })
    })
  }


    return {state, setDay, bookInterview, cancelInterview}
}