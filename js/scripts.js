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


//created a loop to highlight Pokemon height info//

for (let i=0; i > pokemonList.length; i++) {
	if (pokemonList[i].height > 5) {
        document.write('<p>' + pokemonList[i].name + " - This is a big Pokémon!!" + '</p>');

    }
}
  





