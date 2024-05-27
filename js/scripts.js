//created a list of pokemens//
let pokemonList = 
[
    //added an array of pokemon objects//
    {
        name: "Bulbasaur", 
        height: 7, 
        types: ["grass", "posion"]
}, 
    {
        name: "Eevee", 
        height: 3,
        types: ["water", "speed"]
},
    {
        name: "Butterfree",
        height: 2,
        types: ['bug']
    }

];

//created a for loop to write pokemon names and height to index.html//

for (let i = 0; i < pokemonList.length; i++) {
	document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')</p>');
}

//adding code to highlight special pokemon//


if (pokemon.height > 3.5) {
    document.write('<p class="highlight">This is a big Pokémon!!</p>');
} 

  





