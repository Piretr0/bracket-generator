import React, { useState, useEffect, useRef } from "react";
import "./Bracket.css"; // style możesz dopasować do siebie

// Pojedynczy mecz
const Match = ({ teamA, teamB, winner, onSelectWinner, matchRef }) => {
  return (
    <div className="match" ref={matchRef}>
      <div
        className={`team ${winner === teamA ? "winner" : ""}`}
        onClick={() => onSelectWinner(teamA)}
      >
        {teamA || "???"}
      </div>
      <div
        className={`team ${winner === teamB ? "winner" : ""}`}
        onClick={() => onSelectWinner(teamB)}
      >
        {teamB || "???"}
      </div>
      <div className="winner">{winner || "?"}</div>
    </div>
  );
};

// Runda - kolumna meczów
const Round = ({ matches, onSelectWinner, matchRefs }) => {
  return (
    <div className="round">
      {matches.map((match, idx) => (
        <Match
          key={idx}
          teamA={match.teamA}
          teamB={match.teamB}
          winner={match.winner}
          onSelectWinner={(winner) => onSelectWinner(idx, winner)}
          matchRef={matchRefs[idx]}
        />
      ))}
    </div>
  );
};

// Bracket - cała drabinka
const Bracket = ({ participants }) => {
  const numRounds = Math.ceil(Math.log2(participants.length));
  const [rounds, setRounds] = useState([]);
  const matchRefs = useRef([]);

  // inicjalizacja rund
  useEffect(() => {
    const initialMatches = [];
    for (let i = 0; i < participants.length; i += 2) {
      initialMatches.push({
        teamA: participants[i],
        teamB: participants[i + 1] || null,
        winner: null,
      });
    }
    setRounds([initialMatches]);
    matchRefs.current = initialMatches.map(() => React.createRef());
  }, [participants]);

  // wybór zwycięzcy
  const handleSelectWinner = (roundIndex, matchIndex, winner) => {
    setRounds((prev) => {
      const newRounds = prev.map((r) => r.map((m) => ({ ...m })));

      newRounds[roundIndex][matchIndex].winner = winner;

      // przygotowanie następnej rundy
      const nextRoundIndex = roundIndex + 1;
      if (!newRounds[nextRoundIndex]) {
        newRounds[nextRoundIndex] = [];
      }

      const nextMatchIndex = Math.floor(matchIndex / 2);
      if (!newRounds[nextRoundIndex][nextMatchIndex]) {
        newRounds[nextRoundIndex][nextMatchIndex] = { teamA: null, teamB: null, winner: null };
      }

      if (matchIndex % 2 === 0) {
        newRounds[nextRoundIndex][nextMatchIndex].teamA = winner;
      } else {
        newRounds[nextRoundIndex][nextMatchIndex].teamB = winner;
      }

      return newRounds;
    });
  };

  return (
    <div className="bracket-container">
      <div className="bracket">
        {rounds.map((matches, roundIndex) => {
          const refsForRound = matches.map(
            (_, idx) => matchRefs.current[idx] || React.createRef()
          );
          return (
            <Round
              key={roundIndex}
              matches={matches}
              onSelectWinner={(matchIdx, winner) =>
                handleSelectWinner(roundIndex, matchIdx, winner)
              }
              matchRefs={refsForRound}
            />
          );
        })}
      </div>
      {/* Linie między rundami */}
      <Lines rounds={rounds} />
    </div>
  );
};

// Linie łączące zwycięzców
const Lines = ({ rounds }) => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const newLines = [];

    rounds.forEach((matches, roundIdx) => {
      if (!rounds[roundIdx + 1]) return;

      matches.forEach((match, matchIdx) => {
        const winner = match.winner;
        if (!winner) return;

        // linia pozioma między zwycięzcą a kolejnym meczem
        const nextMatch = rounds[roundIdx + 1][Math.floor(matchIdx / 2)];
        if (!nextMatch) return;

        newLines.push({ fromMatch: matchIdx, toMatch: Math.floor(matchIdx / 2), round: roundIdx });
      });
    });

    setLines(newLines);
  }, [rounds]);

  return (
    <svg className="lines-svg">
      {lines.map((line, idx) => {
        // tu można użyć dokładnych pozycji elementów match do rysowania linii
        return <line key={idx} x1={0} y1={0} x2={100} y2={50} stroke="black" strokeWidth={2} />;
      })}
    </svg>
  );
};

// Przykład użycia
export default function App() {
  const participants = [
    "Uczestnik 1",
    "Uczestnik 2",
    "Uczestnik 3",
    "Uczestnik 4",
    "Uczestnik 5",
    "Uczestnik 6",
    "Uczestnik 7",
    "Uczestnik 8",
  ];

  return <Bracket participants={participants} />;
}
