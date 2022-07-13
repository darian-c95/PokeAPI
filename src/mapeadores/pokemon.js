import Pokemon from '../entidades/pokemon.js'; 
import ListadoPokemones from '../entidades/listadoPokemones.js'; 


export function mapearPokemon(datosApi) {

  const {
    name,
    sprites: { front_default: imageFront, back_default: imageBack },
    weight,
    height,
    base_experience: baseExperience,
    abilities,
    types,
  } = datosApi;


  return new Pokemon(
    name,
    imageFront,
    imageBack,  
    weight,
    height,
    baseExperience,
    types.map((item) => item.type.name),     
    abilities.map( async ability => {
    
      let respuesta = await fetch(ability.ability.url)
      let data = await respuesta.json();
      
      let nameAbility = data.name;
      let descriptionAbility = (data.effect_entries.filter(cada => cada.language.name === 'en')[0].short_effect);  
 
      return [nameAbility, descriptionAbility];
    })
  );
};


export function mapearListadoPokemones(datosApi) {
  const {
    count, 
    results,
  } = datosApi;

  return new ListadoPokemones(
    count, 
    results.map((pokemon) => pokemon.name),
  );
};
