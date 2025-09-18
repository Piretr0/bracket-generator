import React from "react";
import Match from "./Match";

const Round = ({ matches, roundIndex, onWinner, key  }) => {
  if (!matches || matches.length === 0) return null;

  return (
    <div key={key} className="round" style={{ display: "flex", justifyContent: "space-around", flexDirection: "column", gap: "40px", position: "relative" }}>
      {matches.map((match) => (
        <div key={matches.id} style={{ position: "relative" }}>
          <Match match={match} onWinner={onWinner} />
        </div>
      ))}
    </div>
  );
};

export default Round;
