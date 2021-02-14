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
        class="item add-{participantType}"
        onClick={props.handleClick(participantType)}
      >
        <LargeEmoji>{typeConfig.emoji}</LargeEmoji>
        {typeConfig.label}
      </a>
    ))
  }</div>
);

export default EditMenu;
