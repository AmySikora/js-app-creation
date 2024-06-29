let pokemonRepository = (function () {
      // Define the array of Pokemon objects
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
// Added a new Pokemon 
function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon &&
    "detailsUrl" in pokemon
  ) {
};

// Function to get all Pokemon
function getAll() {
return pokemonList;
}
//Show Pokemon details 
function showDetails (pokemon) {
  console.log(pokemon);
};

//Click event listener button added to display Pokemon details
function onClick(clickedButton, pokemon) {
  clickedButton.addEventListener('click', function (event) {
  pokemonRepository.showDetails(pokemon);
  });
}

// Create and append pokemon list item with a Pokemon button
function addListItem (pokemon) {
  let pokemonListElement = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('pokemon-card');
  listItem.appendChild(button);
  pokemonListElement.appendChild(listItem);
  onClick(button, pokemon); 
};
//Promise function
function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList
  };
};
// Logs Pokemon in repository
console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"]
});

// Adds a new Pokemon to repository
//console.log(pokemonRepository.getAll());

// Logs all Pokemon to the repository 
pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
  });

})});