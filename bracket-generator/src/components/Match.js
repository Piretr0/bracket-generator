import React from "react";
import Team from "./Team";

const Match = ({ match, onWinner }) => {

  const handleClickWinner = (team) => {
    if (!team || !onWinner) return;
    onWinner(match.id, team);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{ border: "1px solid black", padding: "10px 20px", marginBottom: "5px", cursor: "pointer" }}
        onClick={() => handleClickWinner(match.team_a)}
      >
         {match.team_a ? match.team_a.nazwaZespolu : "???"} ({match.team_a_score ?? 0})
        {/* <Team team={match.team_a} score={match.team_a_score} /> */}
      </div>

      <div
        style={{ border: "1px solid black", padding: "10px 20px", cursor: "pointer" }}
        onClick={() => handleClickWinner(match.team_b)}
      >
         {match.team_b ? match.team_b.nazwaZespolu : "???"} ({match.team_b_score ?? 0})
        {/* <Team team={match.team_b} score={match.team_b_score} /> */}
      </div>
    </div>
  );
};

export default Match;
