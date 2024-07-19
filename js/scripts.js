let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

  function getAll() {
    return pokemonList;
  }

  function onClick(clickedButton, pokemon) {
    clickedButton.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-primary', 'pokemon-card');
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
    onClick(button, pokemon);
  }

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

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types.map((typeInfo) => typeInfo.type.name).join(', ');
      item.abilities = details.abilities.map((abilityInfo) => abilityInfo.ability.name).join(', ');
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal(name, height, weight, types, abilities, imageUrl) {
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    let nameElement = document.createElement('h1');
    nameElement.innerText = name;

    let heightElement = document.createElement('p');
    heightElement.innerText = `Height: ${height}`;

    let weightElement = document.createElement('p');
    weightElement.innerText = `Weight: ${weight}`;

    let typesElement = document.createElement('p');
    typesElement.innerText = `Types: ${types}`;

    let abilitiesElement = document.createElement('p');
    abilitiesElement.innerText = `Abilities: ${abilities}`;

    let imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.classList.add('img-fluid');

    modalTitle.appendChild(nameElement);
    modalBody.appendChild(imageElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(typesElement);
    modalBody.appendChild(abilitiesElement);

    $('#pokemonModal').modal('show');
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(
        item.name,
        item.height,
        item.weight,
        item.types,
        item.abilities,
        item.imageUrl
      );
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

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
