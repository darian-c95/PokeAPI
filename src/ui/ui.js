import {cambiaOpacidadSegundoCirculo, nombreMayuscula} from '../logica.js'; 
 

export function tituloCarta(nombreDePokemon) {
  document.querySelector('h2').textContent = nombreMayuscula(nombreDePokemon);
}

export function imagenFrontal(fotoPokemon) {
  let $imagen = document.querySelector('#front_default');
  $imagen.src = fotoPokemon;
  $imagen.setAttribute('alt', 'foto delantera de pokemon'); 

  cambiaOpacidadSegundoCirculo();
}

export function pokemonTipo(dataPokemon) {
  let arrayPokemonTipo = [];
  dataPokemon.types.forEach(tipo => arrayPokemonTipo.push(tipo.type.name))

  const $tipos = document.querySelector('#tipos');
  $tipos.innerHTML = ''
  $tipos.textContent = 'Tipo:'

  arrayPokemonTipo.forEach(tipo => {
    const $tipo = document.createElement('span');
    $tipo.textContent = `${tipo} `;
    $tipo.className = `${tipo} badge`
    $tipos.appendChild($tipo);
  }); 
}

export function pokemonHabilidades(dataPokemon) { 
  document.querySelector('#contenedor-habilidades h3').textContent = 'Habilidades'
  let $totalHabilidades = document.querySelector('#total-habilidades')

  $totalHabilidades.innerHTML = '';
  let kontador = 0
  dataPokemon.abilities.forEach(habilidad => { 
    kontador++
    let $nombreHabilidad = document.createElement('p');
    $nombreHabilidad.textContent = `${nombreMayuscula(habilidad.ability.name)}: `;
    $nombreHabilidad.className = `habilidad-${kontador}`
    $totalHabilidades.appendChild($nombreHabilidad);
  })
  
  let count = 0;
  dataPokemon.abilities.forEach(habilidad => fetch(habilidad.ability.url)
  .then((respuesta) => respuesta.json())
  .then((r) => {    
      count++
      const $texto = document.createElement('span');
      $texto.textContent = (r.flavor_text_entries.filter(cada => cada.language.name === 'es')[0].flavor_text);
      let $nameAbility = document.querySelector(`.habilidad-${count}`)
      $nameAbility.appendChild($texto)
  }))
}

export function pokemonAltura(respuesta) {
  document.querySelector('#altura').textContent = `Altura: ${respuesta}cm`; 
}

export function pokemonPeso(respuesta) {
  document.querySelector('#peso').textContent = `Peso: ${respuesta}g`; 
}

export function pokemonexperienciaBase(respuesta) {
  document.querySelector('#experiencia_base').textContent = `Experiencia Base: ${respuesta}`;  
}