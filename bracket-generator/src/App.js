import React, { useState } from "react";
import Bracket from "./components/Bracket"; // import komponentu drabinki
import "./App.css";
import generateBracket from "./utils/GenerateBracket";

function App() {

// Przykładowe dane (Lista)

const bracketData = generateBracket();

 const [matches, setMatches] = useState([
    {
      prematches: bracketData.prematches,
      generalmatches: bracketData.generalmatches,
      final: bracketData.final
    }
  ]);

  const handleWinner = (matchId, winnerTeam) => {
    setMatches(prev => {
      const newMatches = JSON.parse(JSON.stringify(prev)); // deep copy
      const allMatches = [...newMatches[0].prematches, ...newMatches[0].generalmatches.flat(), newMatches[0].final];

      // Znajdź aktualny mecz
      const currentIndex = allMatches.findIndex(m => m.id === matchId);
      if (currentIndex === -1) return prev;

      // Znajdź następny mecz, gdzie zwycięzca powinien trafić
      const nextIndex = currentIndex + 1; // prosty przykład; można dostosować logikę do drabinki
      if (nextIndex < allMatches.length) {
        const nextMatch = allMatches[nextIndex];

        // Wstaw zwycięzcę do pierwszego wolnego miejsca
        if (!nextMatch.team_a) nextMatch.team_a = winnerTeam;
        else if (!nextMatch.team_b) nextMatch.team_b = winnerTeam;
      }

      return newMatches;
    });
  };


  return (
    <div className="App">
      <h1>Turniejowa Drabinka</h1>
      <Bracket matches={matches} onWinner={handleWinner} />
    </div>
  );
}

export default App;
