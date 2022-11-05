

export function getAppointmentsForDay(state, day) {
 const dayObj = state.days.find(x => x.name === day)
 if (!dayObj) {
  return []
 }
 return dayObj.appointments.map(appointmentId => state.appointments[appointmentId])
}