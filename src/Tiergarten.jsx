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

const inverseMatrix = [
  // only works for the default config
  [0, 0, 1],
  [4, -0.5, -2],
  [-3, 0.5, 1]
];

const materialsVectorToValues = ([persons, legs, shirts]) => ({
  persons,
  legs,
  shirts
});

const valuesToMaterialsVector = values => [
  values.persons,
  values.legs,
  values.shirts
];

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
    ["rabbit", "cricket", "octopus"].map(participantType => {
      const requirements = participantTypes[participantType].requirements;
      return ["persons", "legs", "shirts"].map(material =>
        material === "persons" ? 1 : requirements[material]
      );
    })
  ).transpose();

const fixValue = value => (value < 0 ? 0 : Math.floor(value));

const guessCounts = values =>
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
    const guessedCounts = guessCounts(values);
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
  );

const Tiergarten = props => {
  const participantTypes = props.config.participantTypes;
  console.log("mat", participantTypesToMatrix(participantTypes));
  const materialCounts = getMaterialCounts(props.state, participantTypes);
  const participantPropsByType = {
    rabbit: { onClick: props.handleDelete("rabbit") },
    cricket: { onClick: props.handleDelete("cricket") },
    octopus: { onClick: props.handleDelete("octopus") }
  };
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
          />
        </div>
      </div>
    </>
  );
};

export default Tiergarten;
