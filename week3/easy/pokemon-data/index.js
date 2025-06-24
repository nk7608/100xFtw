const numOfCardsInput = document.getElementById("cardNum");
const dropdownBtn = document.querySelector(".dropdownBtn");
const submitBtn = document.getElementById("submitBtn");
const categories = document.querySelector(".categories");
const cardContainer = document.querySelector(".display");
const errorEl = document.querySelector(".error");

let selectedCategory = '';

function toggleCategories() {
  if (categories.style.display === "flex") {
    categories.style.display = "none";
  } else {
    categories.style.display = "flex";
  }
}

function showError(error) {
  errorEl.textContent = typeof error === "string" ? error : error.message;
  errorEl.style.display = "block";
}


function clearError() {
  errorEl.textContent = "";
  errorEl.style.display = "none";
}


function validateInputs(numOfCards, selectedCategory) {
  if (!numOfCards || numOfCards <= 0) {
    showError("Please enter a valid number of cards!");
    return false;
  }
  if (!selectedCategory) {
    showError("Please select a category!");
    return false;
  }
  return true;
}


async function loadCategories() {
  try {
    categories.innerHTML = ""; 
    const response = await fetch('https://pokeapi.co/api/v2/type/');
    if (!response.ok) throw new Error('Failed to fetch Pokémon types');
    const data = await response.json();

    data.results.forEach(type => {
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = type.name;
      categories.appendChild(a);

      a.addEventListener("click", (e) => {
        e.preventDefault();
        selectedCategory = type.name;
        dropdownBtn.textContent = selectedCategory;
        categories.style.display = "none";
      });
    });
  } catch (error) {
    showError(error.message);
  }
}


async function getPokemonData(numOfCards, selectedCategory) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedCategory}`);
    if (!response.ok) throw new Error(`Failed to fetch Pokémon for category "${selectedCategory}"`);
    const data = await response.json();

    const pokemons = data.pokemon.slice(0, numOfCards);
    cardContainer.innerHTML = "";

    const detailsPromises = pokemons.map(p =>
      fetch(p.pokemon.url).then(res => {
        if (!res.ok) throw new Error(`Failed to fetch details for ${p.pokemon.name}`);
        return res.json();
      })
    );

    const pokemonDetails = await Promise.all(detailsPromises);

    pokemonDetails.forEach(pokemon => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h3>${pokemon.name}</h3>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        <p>Types: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
      `;
      cardContainer.appendChild(card);
    });

  } catch (error) {
    showError(error);
  }
}


async function submit() {
  clearError();
  const numOfCards = Number(numOfCardsInput.value);
  if (!validateInputs(numOfCards, selectedCategory)) return;

  try {
    await getPokemonData(numOfCards, selectedCategory);
  } catch (err) {
    showError(err);
  }
}


loadCategories();

dropdownBtn.addEventListener("click", toggleCategories);
submitBtn.addEventListener("click", submit);
