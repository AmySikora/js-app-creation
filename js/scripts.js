let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
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

  function addListItem(pokemon, sizeCategory) {
    let categoryElement = document.querySelector(`#${sizeCategory} .pokemon-list`);
    if (!categoryElement) {
      console.error(`Category element #${sizeCategory} .pokemon-list not found.`);
      return;
    }

    // Create list item and button
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    let button = document.createElement('button');
    button.classList.add('btn', 'btn-primary', 'btn-block', 'text-center', 'd-flex', 'flex-column', 'align-items-center'); // Adjusted classes
    button.innerHTML = `
      <img src="${pokemon.imageUrl}" alt="${pokemon.name}" class="img-fluid" style="width: 50px; height: 50px;">
      <span>${pokemon.name}</span>
    `;
    listItem.appendChild(button);

    // Append to the correct category element
    categoryElement.appendChild(listItem);

    // Attach click event
    onClick(button, pokemon);
  }

  function pokemonExistsInList(pokemon, categoryElement) {
    // Check if any button in the list already has the same pokemon name
    let buttons = categoryElement.querySelectorAll('.btn span');
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].textContent === pokemon.name) {
        return true;
      }
    }
    return false;
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
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map(typeInfo => typeInfo.type.name).join(', ');
        item.weight = details.weight;
        item.abilities = details.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');

        let sizeCategory = getSizeCategory(item.height); // Determine size category
        addListItem(item, sizeCategory); // Add item to the correct category
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function getSizeCategory(height) {
    if (height < 10) {
      return 'small';
    } else if (height < 20) {
      return 'medium';
    } else {
      return 'large';
    }
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + item.name + "</h1>");
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", item.imageUrl);
    let heightElement = $("<p>" + "Height: " + item.height + "</p>");
    let weightElement = $("<p>" + "Weight: " + item.weight + "</p>");
    let typesElement = $("<p>" + "Types: " + item.types + "</p>");
    let abilitiesElement = $("<p>" + "Abilities: " + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);

    $("#pokemonModal").modal('show');
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  let sortedPokemon = pokemonRepository.getAll().sort((a, b) => a.weight - b.weight);
  sortedPokemon.forEach(function (pokemon) {
    pokemonRepository.loadDetails(pokemon);
  });
});
