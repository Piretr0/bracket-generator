import React from "react";
import Match from "./Match";

const Round = ({ matches, roundIndex, onWinner  }) => {
  if (!matches || matches.length === 0) return null;

  return (
    <div className="round" style={{ display: "flex", flexDirection: "column", gap: "40px", position: "relative" }}>
      {matches.map((match) => (
        <div key={match.id} style={{ position: "relative" }}>
          <Match match={match} onWinner={onWinner} />
        </div>
      ))}
    </div>
  );
};

export default Round;
