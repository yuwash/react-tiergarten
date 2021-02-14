import React, { useState } from "react";
import EditMenu from "./EditMenu";
import Tiergarten from "./Tiergarten";
import "./style.css";
import "fomantic-ui-css/semantic.css";

const App = () => {
  const state = {
    rabbit: useState(0),
    cricket: useState(0),
    octopus: useState(0)
  };
  const handleAdd = participantType => event => {
    const [count, setCount] = state[participantType];
    const newCount = (state[participantType][0] = count + 1);
    setCount(newCount);
    console.log(state);
  };
  const handleDelete = participantType => event => {
    const [count, setCount] = state[participantType];
    const newCount = (state[participantType][0] = count - 1);
    setCount(newCount);
    console.log(state);
  };
  return (
    <div>
      <h1>Tiergarten</h1>
      <p>
        Klick auf die Teilnehmer*innen-Knöpfe, damit sie in den Tiergarten
        kommen!
      </p>
      <EditMenu handleClick={handleAdd} />
      <Tiergarten state={state} handleDelete={handleDelete} />
    </div>
  );
};
export default App;
