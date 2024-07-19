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
  clickedButton.addEventListener('click', function () {
  showDetails(pokemon);
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

//Show Pokemon details via modals
function showDetails(item) {
  loadDetails(item).then(function () {
    showModal(item.name, `Height: ${item.height}`, item.imageUrl);
  });
}
  
// Add modal for Pokemen a
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle =$(".modal-title");
    let modalHeader = $(".modal-header");
    
    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal
    let nameElement =$("<h1> + item.name + </h>");
    //create modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("scr", item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">')
    imageElementBack.attr("src", item.imageUrlBack);
    // Creating element for height in modal
    let heightElement = $("<p>" + "height : " + item.height + "</p>");
    //creating element for weight
    let weightElement = $("<p" + "weight : " + item.weight + "</p>");
    // Creating element for type in modal
    let typesElement = $("<p>" + "types : " + item.types + "</p>");
    // Creating abilities element
    let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");

    
    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal); 
    
    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    
    modalContainer.classList.add('is-visible');
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

  document.querySelector('#modal-container').addEventListener('click', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.target === modalContainer) {
      hideModal();
    }
  });
  
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

  $('[data-toggle="modal"]').on('click', function(){
    let targetSelector = $(this).attr('data-target');
    $(targetSelector).modal('show'); // Bootstrap’s own function to make the modal appear
  });
  