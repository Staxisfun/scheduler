import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      console.log("interview: ", interview)
      transition(SAVING) //trans deleting
      props.bookInterview(props.id, interview) //cancel interview
      .then((res) => {
        transition(SHOW); //trans empty
      });
    }


    function deleteI() {
      transition(DELETING) //trans deleting
      props.cancelInterview(props.id) //cancel interview
      .then((res) => {
        transition(EMPTY); //trans empty
      });
    }







  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteI}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave = {save}
      />)}
      {mode === SAVING && (
        <Status
        message={"Saving"}
        />
        )}
      {mode === DELETING && (
        <Status
        message={"Deleting"}
        />
        )}
    </article>
  );
}