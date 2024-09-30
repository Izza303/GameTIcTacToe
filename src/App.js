import { useState } from "react";
function Square({ value, onsqureclick }) {
  return (
    <button className="square" onClick={onsqureclick}>
      {value}
    </button>
  );
}

function Board({ xisnext, squares, onPlay }) {
  function handleclick(i) {
    if (calculatewinner(squares) || squares[i]) {
      return;
    }
    const nextsquares = squares.slice();
    if (xisnext) {
      nextsquares[i] = "X";
    } else {
      nextsquares[i] = "O";
    }
    onPlay(nextsquares);
  }

  const winner = calculatewinner(squares);
  let status;
  let nextplayer = xisnext ? "X" : "O";
  if (winner) {
    status = "Winner is:" + winner;
  } else {
    status = "Next Player is :" + nextplayer;
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onsqureclick={() => handleclick(0)} />
        <Square value={squares[1]} onsqureclick={() => handleclick(1)} />
        <Square value={squares[2]} onsqureclick={() => handleclick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onsqureclick={() => handleclick(3)} />
        <Square value={squares[4]} onsqureclick={() => handleclick(4)} />
        <Square value={squares[5]} onsqureclick={() => handleclick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onsqureclick={() => handleclick(6)} />
        <Square value={squares[7]} onsqureclick={() => handleclick(7)} />
        <Square value={squares[8]} onsqureclick={() => handleclick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, sethistory] = useState([Array(9).fill(null)]);
  const [currentmove, setcurrentmove] = useState(0);
  const xisnext = currentmove % 2 === 0;
  const currentsquare = history[currentmove];

  function handlePlay(nextsquares) {
    const nexthistory = [...history.slice(0, currentmove + 1), nextsquares];
    sethistory(nexthistory);
    setcurrentmove(nexthistory.length - 1);
  }

  function jumpto(nextmove) {
    setcurrentmove(nextmove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go To Move #" + move;
    } else {
      description = "Go To Game Start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpto(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xisnext={xisnext} squares={currentsquare} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculatewinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (squares.every((square) => square !== null)) {
    return "Game Tie";
  }
  return null;
}
