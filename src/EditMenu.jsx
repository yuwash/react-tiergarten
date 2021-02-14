import React from "react";

const LargeEmoji = ({children}) => (
  <div className="large-emoji">{children}</div>
)

const EditMenu = (props) => (
  <div class="ui labeled icon compact menu">
    <a class="item add-rabbit" onClick={props.handleClick("rabbit")}>
      <LargeEmoji>🐇</LargeEmoji>
      Hase
    </a>
    <a class="item add-cricket" onClick={props.handleClick("cricket")}>
      <LargeEmoji>🦗</LargeEmoji>
      Grille
    </a>
    <a class="item add-octopus" onClick={props.handleClick("octopus")}>
      <LargeEmoji>🐙</LargeEmoji>
      Oktopus
    </a>
  </div>
);
export default EditMenu;
