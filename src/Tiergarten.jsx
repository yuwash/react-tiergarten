import React from "react";

const makeParticipantsForType = (participantType, count, typeConfig, props) =>
  Array(count)
    .fill(null, 0, count)
    .map(() => (
      <a data-tooltip="entfernen" {...props} alt={typeConfig.label}>
        {typeConfig.emoji}
      </a>
    ));

const Tiergarten = props => {
  const participantTypes = props.config.participantTypes;
  const materialCounts = Object.entries(props.state).reduce(
    (result, [participantType, count]) => ({
      persons: result.persons + (count || 0),
      legs: result.legs + (
        participantTypes[participantType].requirements.legs * count || 0),
      shirts:
        result.shirts + (
          participantTypes[participantType].requirements.shirts * count || 0)
    }),
    { persons: 0, legs: 0, shirts: 0 }
  );
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
