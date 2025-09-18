import React from "react";
import Round from "./Round";

const Bracket = ({ matches, onWinner }) => {
  if (!matches || matches.length === 0) {
    return <div>Brak danych do wyświetlenia drabinki.</div>;
  }

  console.log("Matches prop:", matches);
  const { prematches = [], generalmatches = [], final = null } = matches[0];

const columns = [
  { matches: prematches || [] },
  ...((generalmatches || []).map((roundMatches) => ({ matches: roundMatches || [] }))),
  { matches: final ? [final] : [] }
];

return (
  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "40px" }}>
    {columns.map((col, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: i === 0 ? "flex-end" : "center", // prematches na dole, reszta wycentrowana
          alignItems: "center",
          gap: "20px"
        }}
      >
        <Round matches={col.matches} roundIndex={i} onWinner={onWinner} />
      </div>
    ))}
  </div>
);

};

export default Bracket;
