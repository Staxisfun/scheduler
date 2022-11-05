

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