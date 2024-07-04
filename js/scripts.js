let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
// Added a new Pokemon 
function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon
  ) {
    pokemonList.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  }
}
// Function to get all Pokemon
function getAll() {
return pokemonList;
}
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
      console.log(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}
//load details
function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
}
//Show Pokemon details 
function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function () 
  {
    console.log(item);
  });
}
return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails
};
})();
// Logs all Pokemon to the repository 
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
// Add modal for Pokemen app

(function() {
  function showModal(title, text) {
  let modalContainer = document.querySelector('#modal-container');

  // Clear all exisiting modal content
  modalContainer.innerHTML = '';
  
  let modal = document.createElement('div');
  modal.classList.add('modal');
  
  //Add the new model content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  }

  function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('Modal title', 'This is the modal content!');
});

})();
