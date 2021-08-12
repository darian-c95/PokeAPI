import {irACartaAnterior, irASiguienteCarta} from './logica.js';
import {obtenerPokemones} from './pokeapi.js';


export function mostrarSiguienteCarta() {
    irASiguienteCarta();
}


export function mostrarCartaAnterior() {
    irACartaAnterior();
}


export function pokemonCaracteristicas(numero){
    obtenerPokemones(numero).then((r) => {
        let namePokemon = r.forms[0].name;
        let namePokemonUppercase = namePokemon[0].toUpperCase() + namePokemon.slice(1);

        tituloCarta(namePokemonUppercase);
        imagenFrontal(r);
        pokemonTipo(r);
        pokemonHabilidades(r);
        pokemonAlturaPeso(r);
        pokemonexperienciaBase(r);         
    }
)}
  

function tituloCarta(nombreDePokemon) {
    $("h2").text(
      `${(nombreDePokemon)}`
    );
}

function imagenFrontal(respuesta) {
    $("#front_default").attr({
      src: respuesta.sprites.front_default,
      title: "Imagen Frontal",
      alt: "Imagen que muestra el frente del pokemon"
    });
}

function pokemonTipo(respuesta) {
    if(respuesta.types.length === 1) {
        $("#type").text(
          `Type: ${respuesta.types[0].type.name}`
          );
    } else {
        $("#type").text(
          `Type: ${respuesta.types[0].type.name}, ${respuesta.types[1].type.name}`
        );
    } 
}

function pokemonHabilidades(respuesta) {
    if(respuesta.abilities.length === 1) {
        $("#ability").text(
          `Ability: ${respuesta.abilities[0].ability.name}.`
        );
    } else if (respuesta.abilities.length === 2) {
        $("#ability").text(
          `Ability: ${respuesta.abilities[0].ability.name}, ${respuesta.abilities[1].ability.name}`
        );
    } else {
        $("#ability").text(
          `Ability: ${respuesta.abilities[0].ability.name}, ${respuesta.abilities[1].ability.name}, ${respuesta.abilities[2].ability.name}`
        );
    } 
}

function pokemonAlturaPeso(respuesta) {
    $("#height").text(
      `Height: ${respuesta.height} cm`
    );

    $("#weight").text(
      `Weight: ${respuesta.weight} g`
    );
}

function pokemonexperienciaBase(respuesta) {
    $("#base_experience").text(
      `Base experience: ${respuesta.base_experience}`
    );
}