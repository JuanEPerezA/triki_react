import { Opciones_Ganar } from "./config";

export const validarGanador = (validarTablero) => {
  for (const opcion of Opciones_Ganar){
    const [a, b, c] = opcion;
    if (validarTablero[a] && validarTablero[a] === validarTablero[b] && validarTablero[a] === validarTablero[c]){
      return validarTablero[a];
    }
  }
  return null;
};

export const validarFinJuego =  (nuevoTablero) => {
  return nuevoTablero.every((square) => square !== null);
};