import { Square } from "./Square.jsx";

export const ModalResultados = ({ ganador, reiniciarJuego }) => {
  if (ganador === null) return null;

  const textoResultado = ganador === false ? 'Empate' : 'Ganó';
  return (
      <section className="winner">
        <div className="text">
          <h2>{textoResultado}</h2>
          {ganador && (
            <header className="win">
              <Square>{ganador}</Square>
            </header>
          )}
          <footer>
            <button onClick={reiniciarJuego}>Empezar de nuevo</button>
          </footer>
        </div>
      </section>
  );
};
