

export function getAppointmentsForDay(state, day) {
 const dayObj = state.days.find(x => x.name === day)
 if (!dayObj) {
  return []
 }
 return dayObj.appointments.map(appointmentId => state.appointments[appointmentId])
}


export function getInterview(state, interview) {
  let interviewObj = {};

  if (!interview) {
    return null;
  }

  interviewObj["student"] = interview.student;
  interviewObj["interviewer"] = state.interviewers[interview.interviewer];

  return interviewObj
}



// export function getInterviewersForDay(state, day) {
//   const dayObj = state.days.find(x => x.name === day)
//   if (!dayObj) {
//    return []
//   }
//   return dayObj.appointments.map(appointmentId => state.appointments[appointmentId])
//  }



export function getInterviewersForDay(state, day) {
  
  let interviewers = [];

  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      interviewers = dayObj.interviewers
    }
  }
  
  const interviewerList = interviewers.map((id) => {
    for (let interviewer in state.interviewers) {
      if (Number(interviewer) === id) {
        return state.interviewers[interviewer];
      }
    } 
    return null;
  })

  return interviewerList;

};