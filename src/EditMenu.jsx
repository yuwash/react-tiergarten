import React from "react";

const LargeEmoji = ({children}) => (
  <div className="large-emoji">{children}</div>
)

const EditMenu = (props) => (
  <div className="ui labeled icon compact menu">{
    Object.entries(props.config.participantTypes)
    .map(([participantType, typeConfig]) => (
      <a
        key={participantType}
        className={`item add-{participantType}`}
        onClick={props.handleClick(participantType)}
      >
        <LargeEmoji>{typeConfig.emoji}</LargeEmoji>
        {typeConfig.label}
        <div className="ui top right attached label">
          {props.state[participantType]}
        </div>
      </a>
    ))
  }</div>
);

export default EditMenu;
