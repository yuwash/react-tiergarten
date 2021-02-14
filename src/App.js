import React, { useReducer, useState } from "react";
import EditMenu from "./EditMenu";
import initialConfig from "./initialConfig";
import Tiergarten from "./Tiergarten";
import "./style.css";
import "fomantic-ui-css/semantic.css";

const buildInitialState = (config) => Object.fromEntries(
  Object.keys(config.participantTypes)
  .map(participantType => [participantType, 0])
);

const reducer = (state, action) => {
  const nextState = Object.assign({}, state);
  switch(action.type) {
    case "update":
      Object.assign(nextState, action.values);
      return nextState;
    case "add":
      nextState[action.participantType] += 1;
      return nextState;
    case "delete":
      nextState[action.participantType] -= 1;
      return nextState;
  }
};

const App = () => {
  const [config, setConfig] = useState(initialConfig);
  const [state, dispatch] = useReducer(reducer, config, buildInitialState);
  const updateValues = values => {
    dispatch({ type: "update", values })
  };
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
      <EditMenu config={config} handleClick={handleAdd} />
      <Tiergarten
        config={config}
        state={state}
        updateValues={updateValues}
        handleDelete={handleDelete}
      />
    </div>
  );
};
export default App;
