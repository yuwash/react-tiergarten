import React from "react";

const participantTypes = {
  rabbit: {
    legs: 4,
    shirts: 1
  },
  cricket: {
    legs: 6,
    shirts: 0
  },
  octopus: {
    legs: 8,
    shirts: 0
  }
};

const emojiByType = {
  rabbit: "🐇",
  cricket: "🦗",
  octopus: "🐙"
};

const makeParticipantsForType = (participantType, count, props) =>
  Array(count)
    .fill(null, 0, count)
    .map(() => <a title="entfernen" {...props}>{emojiByType[participantType]}</a>);

const Tiergarten = props => {
  const materialCounts = Object.entries(props.state).reduce(
    (result, [participantType, [count, setCount]]) => ({
      persons: result.persons + (count || 0),
      legs: result.legs + (participantTypes[participantType].legs * count || 0),
      shirts:
        result.shirts + (participantTypes[participantType].shirts * count || 0)
    }),
    { persons: 0, legs: 0, shirts: 0 }
  );
  const participantPropsByType = {
    rabbit: { onClick: props.handleDelete("rabbit") },
    cricket: { onClick: props.handleDelete("cricket") },
    octopus: { onClick: props.handleDelete("octopus") }
  };
  const participants = Object.entries(props.state).reduce(
    (result, [participantType, [count, setCount]]) =>
      result.concat(
        makeParticipantsForType(
          participantType,
          count,
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
          <a class="header">Benötigte Materialien</a>
          <div class="extra content">{materialCounts.persons} Stirnbänder</div>
          <div class="extra content">{materialCounts.legs} Socken</div>
          <div class="extra content">
            {materialCounts.shirts} T-Shirts (leider nur für Hasen)
          </div>
        </div>
      </div>
    </>
  );
};

export default Tiergarten;
