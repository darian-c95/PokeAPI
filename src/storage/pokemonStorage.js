export function guardarPokemonEnLocalStorage(nombrePokemon, pokemonData) { 

    if (pokemonData === undefined || typeof pokemonData !== 'object') {
        throw new Error('Se necesita un pokemon para guardar en localStorage');
    }

    return localStorage.setItem(`pokemon_${nombrePokemon}`, JSON.stringify(pokemonData));
}

export function traerPokemonDeLocalStorage(pokemonClickLista) {

    if (pokemonClickLista === undefined) {
        throw new Error('Se necesita un identificador para cargar un pokemón');
    }

    const pokemon = JSON.parse(localStorage.getItem(`pokemon_${pokemonClickLista}`));
    
    if (pokemon === null) {
        throw new Error('Se necesita el nombre de un pokemon que este almacenado en localStorage');
    }
     
    return pokemon;
}