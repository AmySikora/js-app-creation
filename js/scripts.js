const pokemonRepository = (function () {
      // Define the array of Pokemon objects
  const pokemonList = [

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
        types: ['bug', 'flying']
    }
];
function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon &&
    "height" in pokemon &&
    "types" in pokemon &&
    Array.isArray(pokemon.types)
  ) {
    pokemonList.push(pokemon);
  } else {
    console.log("Pokemon not added");
  }
}

function getAll() {
return pokemonList;
}

function showDetails (pokemon) {
  console.log(pokemon);
}

function onClick(clickedButton, pokemon) {
  clickedButton.addEventListener('click', function (event) {
    pokemonRepository.showDetails(pokemon);
  });
}
//pokemonRepository.getAll().forEach(function (pokemon) {
  //let pokemonListElement = document.querySelector('.pokemon-list');
  //let listItem = document.createElement('li');
  //let button = document.createElement('button');
  //button.innerText = pokemon.name;
  //button.classList.add('pokemon-card');
  //listItem.appendChild(button);
 //pokemonListElement.appendChild(listItem);
  //onClick(button, pokemon); 
//});


return {
  add: add,
  getAll: getAll,
  showDetails: showDetails,
  addListItem: addListItem
};
})();

pokemonRepository.add({
  name: "Pikachu",
  height: 2,
  types: ['electric']
})

//shouldnot be added
pokemonRepository.add(    {
  name: "Butterfree3",
  height: 2,
  // types: ['bug']
});
// Initialize and add list items
pokemonRepository.getAll().forEach(function (pokemon) {
  let pokemonList = document.querySelector(".pokemon-list");
  let listItem = document.createElement("li");
  let button = document.createElement("button");
  button.innerText= "pokemon.name";
  button.classList.add('pokemon-card');
  listItem.appendChild(button);
  pokemonListElement.appendChild(listItem);
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








 
