//created a list of pokemens//
const pokemonList = 
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
    if (pokemonList[i].height > 5) {
      document.write(
        "<p>" + pokemonList[i].name + " - This is a big Pokémon!!" + "</p>",
      );
    }
    document.write(
      "<p>" +
        pokemonList[i].name +
        " (height: " +
        pokemonList[i].height +
        ")</p>",
    );
  }

//alternnative solution
//pokemonList.forEach((pokemon) => {
   // if (pokemon.height > 5) {
     // document.write(
     //   "<p>" + pokemonList.name + " - This is a big Pokémon!!" + "</p>",
   //   );
   // }
  //  document.write(
    //  "<p>" +
   //     pokemon.name +
   //     " (height: " +
   //     pokemon.height +
   //     ")</p>",
 //   );
 // }





