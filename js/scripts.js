//wrapped functions in IFFE//
//const pokemonRepository = (function () {
  //let pokemonList = []; 
  
//created a list of pokemons//
const pokemonRepository = (function () {
const pokemonList = [
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
function add(pokemon) {
//One way to check if its the object you need.
if(typeof pokemon == "object" && "name" in pokemon && "height" in pokemon && "types" in pokemon && Array.isArray(pokemon.types)){
  pokemonList.push(pokemon);
  return
}
//if it fails 
console.log("failed");
}

function getAll() {
return pokemonList;
}

return {
add: add,
getAll: getAll
};
})();

pokemonRepository.add({
  name: "Pikachu",
  height: 2,
  types: ['bug']
})

//shouldnot be added
pokemonRepository.add(    {
  name: "Butterfree3",
  height: 2,
  // types: ['bug']
})

pokemonRepository.getAll().forEach(function(pokemon) {
  document.write(`<p>${pokemon.name} (height: ${pokemon.height}, types: ${pokemon.types.join(", ")})</p>`
  );
});
    //document.write(
      //"<p>" +
       // pokemonList[i].name +
       // " (height: " +
       // pokemonList[i].height +
      //  ")</p>",
  //  );
 // }

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





