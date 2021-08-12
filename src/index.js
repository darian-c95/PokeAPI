import {pokemonCaracteristicas, mostrarSiguienteCarta, mostrarCartaAnterior} from './ui.js';
import{contador, traeNombredePokemones, pokemonListaClickeado, buscarPokemonPorNombre, imagenes} from './logica.js';

function inicializar() {
  pokemonCaracteristicas(contador);
  traeNombredePokemones();
  pokemonListaClickeado();
  mostrarSiguienteCarta();
  mostrarCartaAnterior();
  buscarPokemonPorNombre();
  imagenes(contador)
}
              
inicializar();

