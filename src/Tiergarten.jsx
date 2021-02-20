import React, { useState } from "react";
import { jStat } from "jstat";
import _ from "lodash-es";

const makeParticipantsForType = (participantType, count, typeConfig, props) =>
  _.range(count).map(key => (
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
  heads: "Stirnbänder",
  legs: "Socken",
  shirts: "T-Shirts (leider nur für Hasen)"
};

const materialKeysVector = ["heads", "legs", "shirts"];
const participantTypeKeysVector = ["rabbit", "cricket", "octopus"];

const valuesToVector = keysVector => values =>
  _.map(
    keysVector,
    key => [values[key]] // transpose for jstat multiply
  );

const materialsVectorToValues = vector =>
  _.zipObject(materialKeysVector, vector);
const valuesToMaterialsVector = valuesToVector(materialKeysVector);

const participantsVectorToState = vector =>
  _.zipObject(participantTypeKeysVector, vector);
const stateToParticipantsVector = valuesToVector(participantTypeKeysVector);

const participantTypesToMatrix = participantTypes =>
  jStat(
    participantTypeKeysVector.map(participantType => {
      const requirements = participantTypes[participantType].requirements;
      return materialKeysVector.map(material => requirements[material]);
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
    _.fromPairs(_.map(materialKeysVector, material => [material, ""]))
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
    <form className="ui form" onSubmit={handleSubmit}>
      <div className="fields">
        {_.map(values, (count, material) => (
          <div className="field" key={material}>
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
      <button className="ui button" type="submit">
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
  const participantPropsByType = _.mapValues(
    participantTypes,
    (_, participantType) => ({ onClick: props.handleDelete(participantType) })
  );
  console.log(participantPropsByType);
  const participants = _.flatMap(props.state, (count, participantType) =>
    makeParticipantsForType(
      participantType,
      count,
      participantTypes[participantType],
      participantPropsByType[participantType]
    )
  );
  const content = participants.length ? participants : "leerer Tiergarten…";
  const requirementsMatrixJ = participantTypesToMatrix(participantTypes);
  const requirementsMatrix = requirementsMatrixJ.toArray();
  const inverseMatrix = jStat.inv(requirementsMatrixJ);
  const roundAt = (x, decimals) =>
    Math.pow(10, -decimals) * Math.round(Math.pow(10, decimals) * x);
  return (
    <>
      <div className="ui card">
        <div className="image">
          <div className="tiergarten">{content}</div>
        </div>
        <div className="content">
          <h2 className="header">Benötigte Materialien</h2>
          {_.map(materialCounts, (count, material) => (
            <div className="ui tiny horizontal statistic" key={material}>
              <div className="value">{count}</div>
              <div className="label">{materialNames[material]}</div>
            </div>
          ))}
        </div>
        <div className="content">
          <h2 className="header">Materialien schon da?</h2>
          <GuessCountsForm
            materialCounts={materialCounts}
            updateValues={props.updateValues}
            inverseMatrix={inverseMatrix}
          />
        </div>
      </div>
      <div className="ui card">
        <div className="content">
          <h2 className="header">Materialien-Matrix</h2>
          <table className="ui celled unstackable table">
            <thead>
              <tr>
                {_.map(participantTypeKeysVector, participantType => (
                  <th key={participantType}>
                    je {participantTypes[participantType].label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {_.map(requirementsMatrix, (row, i) => (
                <tr key={i}>
                  {_.map(row, (col, j) => (
                    <td key={j}>{roundAt(col, 2)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="content">
          <h2 className="header">Inverse Matrix</h2>
          <table className="ui celled unstackable table">
            <tbody>
              {_.map(inverseMatrix, (row, i) => (
                <tr key={i}>
                  {_.map(row, (col, j) => (
                    <td key={j}>{roundAt(col, 2)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tiergarten;
