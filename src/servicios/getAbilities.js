

export async function getAbilities({abilities}) {
    let abilitiesData = []; 
    
    for(let i = 0; i < abilities.length; i++) {
        let arrayAbility = await abilities[i];
        abilitiesData.push(arrayAbility);
    }  
    
    return abilitiesData;
};