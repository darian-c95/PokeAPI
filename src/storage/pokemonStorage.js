export function guardarPokemonEnLocalStorage(respuestaPokemonApi) {
    if (respuestaPokemonApi === undefined || typeof respuestaPokemonApi !== 'object') {
        throw new Error('Se necesita un pokemon para guardar en localStorage');
    }

    return localStorage.setItem(`pokemon_${respuestaPokemonApi.name}`, JSON.stringify(respuestaPokemonApi));
}

export function traerPokemonDeLocalStorage(pokemonClickLista) {
    if (pokemonClickLista === null) {
        throw new Error('Se necesita el nombre de un pokemon que este almacenado en localStorage');
    }
     
    return JSON.parse(localStorage.getItem(`pokemon_${pokemonClickLista}`));
}