import React, { useState } from "react";

const PlayerList = ({ users, rezerwa }) => (
  <div style={{ fontSize: rezerwa ? 17 : 20, paddingLeft: "5px" }}>
    {users?.filter(u => u.rezerwa === rezerwa).map(u => (
      <div key={u.id}>{u.imie} {u.nazwisko}</div>
    ))}
  </div>
);

const Team = ({ team, score }) => {
  const [showPlayers, setShowPlayers] = useState(false);

  if (!team) return <div className="blokDruzyny">???</div>;

  return (
    <div style={{ position: "relative" }}>
      <div className="blokDruzyny" style={{ minWidth: "100px", textAlign: "center" }} onClick={() => setShowPlayers(!showPlayers)}>
        {team?.nazwaZespolu || "???"} ({ score ?? 0})
      </div>
      {showPlayers && (
        <div style={{
          position: "absolute",
          zIndex: 1,
          top: "-85px",
          left: "200px",
          minWidth: "300px",
          border: "2px solid black",
          borderRadius: "5px",
          backgroundColor: "rgb(61,61,61)",
          color: "white",
          padding: "10px"
        }}>
          <div style={{ fontSize: 20 }}>Zespół: {team.nazwaZespolu}</div>
          <div style={{ fontSize: 20 }}>Zawodnicy:</div>
          <PlayerList users={team.users} rezerwa={0} />
          <div style={{ fontSize: 20 }}>Rezerwa:</div>
          <PlayerList users={team.users} rezerwa={1} />
        </div>
      )}
    </div>
  );
};

export default Team;
