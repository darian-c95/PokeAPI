import{pokemonListaClickeado, buscarPokemonPorNombre, creaListaPokemones} from './logica.js';

export function inicializar() {   
  creaListaPokemones()  
  pokemonListaClickeado() 
  buscarPokemonPorNombre(); 
}
inicializar();  


