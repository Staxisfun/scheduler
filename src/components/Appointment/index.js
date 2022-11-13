import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  //import helper functions from hooks
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  //saves an appointment, shows transition SAVING and catch if there's an error
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then((res) => {
        transition(SHOW);
      })
      .catch((err) => {
        transition(ERROR_SAVE, true);
      });
  }


  //cancels an appointment, shows transition CONFIRM and catch if there's an error
  function deleteI() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then((res) => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DELETE, true);
      });
  }



  return (
    <article className="appointment" data-testid="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
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
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => back()}
          onConfirm={deleteI}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />)}
      {mode === ERROR_SAVE && (
        <Error
          message={"ERROR IN SAVING"}
          onClose={() => back()}
        />)}
      {mode === ERROR_DELETE && (
        <Error
          message={"ERROR IN DELETING"}
          onClose={() => back()}
        />)}
    </article>
  );
}