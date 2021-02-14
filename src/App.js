import React, { useReducer } from "react";
import EditMenu from "./EditMenu";
import Tiergarten from "./Tiergarten";
import "./style.css";
import "fomantic-ui-css/semantic.css";

const initialState = {
  rabbit: 0,
  cricket: 0,
  octopus: 0
};

const reducer = (state, action) => {
  const nextState = Object.assign({}, state);
  switch(action.type) {
    case "add":
      nextState[action.participantType] += 1;
      return nextState;
    case "delete":
      nextState[action.participantType] -= 1;
      return nextState;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleAdd = participantType => event => {
    dispatch({ type: "add", participantType });
    console.log(state);
  };
  const handleDelete = participantType => event => {
    dispatch({ type: "delete", participantType });
    console.log(state);
  };
  return (
    <div className="ui container">
      <h1 className="ui header">Tiergarten</h1>
      <p className="ui info message">
        Klick auf die Teilnehmer*innen-Knöpfe, damit sie in den Tiergarten
        kommen!
      </p>
      <EditMenu handleClick={handleAdd} />
      <Tiergarten state={state} handleDelete={handleDelete} />
    </div>
  );
};
export default App;
