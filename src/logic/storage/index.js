export const saveGameToStorage = ({ tablero, turno }) => {
  // Guardar Partida LocalStorage.
  window.localStorage.setItem('tablero', JSON.stringify(tablero));
  window.localStorage.setItem('turno', turno);
};

export const resetGameStorage = () => {
  window.localStorage.removeItem('tablero');
  window.localStorage.removeItem('turno');
};