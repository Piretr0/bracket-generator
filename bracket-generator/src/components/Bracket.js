import React from "react";
import Round from "./Round";

const Bracket = ({ matches, onWinner }) => {
  if (!matches || matches.length === 0) {
    return <div>Brak danych do wyświetlenia drabinki.</div>;
  }

  const { prematches = [], generalmatches = [], final = null } = matches[0];

const columns = [
  { matches: prematches || [] },
  ...((generalmatches || []).map((roundMatches) => ({ matches: roundMatches || [] }))),
  { matches: final ? [final] : [] }
];

return (
<div>
  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "40px" }}>
    {columns.map((col, i) => (

        <Round matches={col.matches} roundIndex={i} onWinner={onWinner} key={i} />

    ))}
  </div>
</div>
  
);

};

export default Bracket;
