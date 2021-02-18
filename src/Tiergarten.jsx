import React, { useState } from "react";
import { jStat } from "jstat";

const makeParticipantsForType = (participantType, count, typeConfig, props) =>
  Array.from(Array(count).entries()).map(([key, __]) => (
    <a
      key={participantType + key}
      data-tooltip="entfernen"
      alt={typeConfig.label}
      {...props}
    >
      {typeConfig.emoji}
    </a>
  ));

const materialNames = {
  persons: "Stirnbänder",
  legs: "Socken",
  shirts: "T-Shirts (leider nur für Hasen)"
};

const materialKeysVector = ["persons", "legs", "shirts"];
const participantTypeKeysVector = ["rabbit", "cricket", "octopus"];

const materialsVectorToValues = ([persons, legs, shirts]) => ({
  persons,
  legs,
  shirts
});

const valuesToMaterialsVector = values => jStat([
  values.persons,
  values.legs,
  values.shirts
]).transpose();

const participantsVectorToState = ([rabbit, cricket, octopus]) => ({
  rabbit,
  cricket,
  octopus
});

const stateToParticipantsVector = state => jStat([
  state.rabbit,
  state.cricket,
  state.octopus
]).transpose();

const participantTypesToMatrix = participantTypes =>
  jStat(
    participantTypeKeysVector.map(participantType => {
      const requirements = participantTypes[participantType].requirements;
      return materialKeysVector.map(material =>
        material === "persons" ? 1 : requirements[material]
      );
    })
  ).transpose();

const fixValue = value => (value < 0 ? 0 : Math.round(value));

const guessCounts = (values, inverseMatrix) =>
  participantsVectorToState(
    jStat(inverseMatrix)
      .multiply(valuesToMaterialsVector(values))
      .toArray()
      .map(fixValue)
  );

const GuessCountsForm = props => {
  const [values, setValues] = useState(() =>
    Object.fromEntries(
      Object.keys(materialNames).map(material => [material, ""])
    )
  );

  const handleChange = event => {
    const newValues = Object.assign({}, values);
    newValues[event.target.name] = event.target.value;
    setValues(newValues);
  };

  const handleSubmit = event => {
    const guessedCounts = guessCounts(values, props.inverseMatrix);
    console.log("submit", values, guessedCounts);
    props.updateValues(guessedCounts);
    event.preventDefault();
  };

  return (
    <form class="ui form" onSubmit={handleSubmit}>
      <div class="fields">
        {Object.entries(values).map(([material, count]) => (
          <div class="field" key={material}>
            <label>{materialNames[material]}</label>
            <input
              type="number"
              min="0"
              required
              name={material}
              placeholder={props.materialCounts[material]}
              value={count}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <button class="ui button" type="submit">
        Teilnehmer*innenzahlen erraten
      </button>
    </form>
  );
};

const getMaterialCounts = (state, participantTypes) =>
  materialsVectorToValues(
    participantTypesToMatrix(participantTypes)
      .multiply(stateToParticipantsVector(state))
      .toArray()
      .map(Math.floor)
  );

const Tiergarten = props => {
  const participantTypes = props.config.participantTypes;
  console.log("mat", participantTypesToMatrix(participantTypes));
  const materialCounts = getMaterialCounts(props.state, participantTypes);
  const participantPropsByType = Object.fromEntries(
    participantTypeKeysVector.map(participantType => [
      [participantType],
      { onClick: props.handleDelete(participantType) },
    ])
  );
  const participants = Object.entries(props.state).reduce(
    (result, [participantType, count]) =>
      result.concat(
        makeParticipantsForType(
          participantType,
          count,
          participantTypes[participantType],
          participantPropsByType[participantType]
        )
      ),
    []
  );
  const content = participants.length ? participants : "leerer Tiergarten…";
  const requirementsMatrixJ = participantTypesToMatrix(participantTypes);
  const requirementsMatrix = requirementsMatrixJ.toArray();
  const inverseMatrix = jStat.inv(requirementsMatrixJ);
  const roundAt = (x, decimals) => (
    Math.pow(10, -decimals) * Math.round(Math.pow(10, decimals) * x)
  );
  return (
    <>
      <div class="ui card">
        <div class="image">
          <div class="tiergarten">{content}</div>
        </div>
        <div class="content">
          <h2 class="header">Benötigte Materialien</h2>
          {Object.entries(materialCounts).map(([material, count]) => (
            <div class="ui tiny horizontal statistic" key={material}>
              <div class="value">{count}</div>
              <div class="label">{materialNames[material]}</div>
            </div>
          ))}
        </div>
        <div class="content">
          <h2 class="header">Materialien schon da?</h2>
          <GuessCountsForm
            materialCounts={materialCounts}
            updateValues={props.updateValues}
            inverseMatrix={inverseMatrix}
          />
        </div>
      </div>
      <div className="ui card">
        <div class="content">
          <h2 className="header">Materialien-Matrix</h2>
          <table className="ui celled table">
            <thead><tr>{participantTypeKeysVector.map(participantType => (
              <th>je {participantTypes[participantType].label}</th>
            ))}</tr></thead>
            <tbody>{ requirementsMatrix.map(row => (
              <tr>{row.map(col => <td>{roundAt(col, 2)}</td>)}</tr>
            )) }</tbody>
          </table>
        </div>
        <div class="content">
          <h2 className="header">Inverse Matrix</h2>
          <table className="ui celled table"><tbody>{inverseMatrix.map(row => (
            <tr>{row.map(col => <td>{roundAt(col, 2)}</td>)}</tr>
          ))}</tbody></table>
        </div>
      </div>
    </>
  );
};

export default Tiergarten;
