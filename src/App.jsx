import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Square } from './components/Square.jsx';
import { Turnos } from './logic/config.js';
import { validarGanador, validarFinJuego } from './logic/validaciones.js';
import { ModalResultados } from './components/ModalResultados.jsx';
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js';
import './App.css'

function App() {
  const [tablero, setTablero] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('tablero');
    if(boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turno, setTurno] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turno');
    return turnFromStorage ?? Turnos.X;
  });

  const [ganador, setGanador] = useState(null);

  const actualizarTablero = (index) => {
    if (tablero[index] || ganador) return;

    const nuevoTablero = [...tablero];
    nuevoTablero[index] = turno;
    setTablero(nuevoTablero);

    const nuevoTurno = turno === Turnos.X ? Turnos.O : Turnos.X;
    setTurno(nuevoTurno);

    saveGameToStorage({
      tablero: nuevoTablero,
      turno: nuevoTurno
    });

    const hayGanador = validarGanador(nuevoTablero);
    if (hayGanador) {
      confetti();
      setGanador(hayGanador);
    } else if (validarFinJuego(nuevoTablero)) {
      setGanador(false);
    }
  };

  const reiniciarJuego = () => {
    setTablero(Array(9).fill(null));
    setTurno(Turnos.X);
    setGanador(null);
    resetGameStorage();
  };

  return (
    <main className="board">
      <h1>Juego de Triki</h1>
      <button onClick={reiniciarJuego}>Empezar de nuevo</button>
      <section className="game">
        {tablero.map((square, index) => {
          return (
            <Square key={index} index={index} actualizarTablero={actualizarTablero}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turno === Turnos.X}>{Turnos.X}</Square>
        <Square isSelected={turno === Turnos.O}>{Turnos.O}</Square>
      </section>

      <ModalResultados ganador={ganador} reiniciarJuego={reiniciarJuego} />
    </main>
  );
}

export default App;
