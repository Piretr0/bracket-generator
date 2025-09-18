import React from "react";
import teams from "./Teams";


function generateBracket() {
  const matches = {
    prematches: [],
    generalmatches: [],
    final: { id: null, team_a: null, team_b: null, team_a_score: null, team_b_score: null },
  };

  const totalTeams = teams.length;
  // Najbliższa większa potęga 2
  let power = 1;
  while (power < totalTeams) power *= 2;

  const preMatchCount = totalTeams - (power / 2); // ile drużyn musi zagrać pre-mecze
  const preMatches = [];

  let matchId = 1;
  let preTeams = teams.slice(-preMatchCount * 2); // ostatnie drużyny idą do pre-meczów
  for (let i = 0; i < preTeams.length; i += 2) {
    preMatches.push({
      id: matchId++,
      team_a: preTeams[i] || null,
      team_b: preTeams[i + 1] || null,
      team_a_score: null,
      team_b_score: null
    });
  }

  matches.prematches = preMatches;

  // Drużyny startujące od razu w generalmatches
  let generalTeams = teams.slice(0, totalTeams - preTeams.length);
  let currentRound = [];

  // Pierwsza runda generalmatches łączy drużyny startujące + zwycięzców pre-meczów
  let combinedTeams = [...generalTeams, ...preMatches.map(m => null)]; // zwycięzcy pre-matchów jako null na razie

  for (let i = 0; i < combinedTeams.length; i += 2) {
    currentRound.push({
      id: matchId++,
      team_a: combinedTeams[i] || null,
      team_b: combinedTeams[i + 1] || null,
      team_a_score: null,
      team_b_score: null
    });
  }

  matches.generalmatches.push(currentRound);

  // Tworzenie kolejnych rund aż do finału
  while (currentRound.length > 1) {
    const nextRound = [];
    for (let i = 0; i < currentRound.length; i += 2) {
      nextRound.push({
        id: matchId++,
        team_a: null,
        team_b: null,
        team_a_score: null,
        team_b_score: null
      });
    }
    matches.generalmatches.push(nextRound);
    currentRound = nextRound;
  }

  // Finał
  matches.final = {
    id: matchId++,
    team_a: null,
    team_b: null,
    team_a_score: null,
    team_b_score: null
  };

  return matches;
}

export default generateBracket;