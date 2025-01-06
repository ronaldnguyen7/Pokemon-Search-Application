const hpText = document.getElementById("hp")
const attackText = document.getElementById("attack")
const defenseText = document.getElementById("defense")
const spAttackText = document.getElementById("special-attack")
const spDefenseText = document.getElementById("special-defense")
const speedText = document.getElementById("speed")
const pokemonPicture = document.getElementById("sprite")
//const nameText = document.getElementById("pokemon-name")
const idText = document.getElementById("pokemon-id")
//const weightText = document.getElementById("weight")
//const heightText = document.getElementById("height")
const pokemonTypes = document.getElementById("types")

const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-button")

const separators = document.querySelectorAll(".separator")

const P = new Pokedex.Pokedex()

function resetDisplay () {
    searchInput.value = ""
    hpText.innerHTML = "&nbsp;"
    attackText.innerHTML = "&nbsp;"
    defenseText.innerHTML = "&nbsp;"
    spAttackText.innerHTML = "&nbsp;"
    spDefenseText.innerHTML = "&nbsp;"
    speedText.innerHTML = "&nbsp;"
    pokemonPicture.src = "#"
    pokemonPicture.style.display = "none"
    //nameText.value = ""
    idText.innerHTML = "&nbsp;"
    //weightText.value = ""
    //heightText.value = ""
    pokemonTypes.innerHTML = ""

    separators.forEach( (separator) => {
        separator.style.display = "none"
    })

}

function captialize (word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}
function displayPokemon (pokemon) {
    pokemon.stats.forEach( (stat) => document.getElementById(stat.stat.name).innerHTML = stat.base_stat )
    //nameText.innerText = pokemon.name.toUpperCase()
    idText.innerText = `#${pokemon.id} ${captialize(pokemon.name)}`
    //weightText.innerText = `Weight: ${pokemon.weight}`
    //heightText.innerText = `Height: ${pokemon.height}`
    pokemonPicture.src = pokemon.sprites.front_default
    pokemonPicture.style.display = "block"
    separators.forEach( (separator) => {
        separator.style.display = "block"
    })
    getPokemonTypes(pokemon)
}

const checkPokemon = async() => {
    try {
        const input = searchInput.value
        const pokemon = await P.getPokemonByName(input.toLowerCase())
        searchInput.value = ""
        displayPokemon(pokemon)
    } catch (err) {
        alert("Pokémon not found")
        resetDisplay()
        console.error(err)
    }
}

function typeButton (type) {
    return `<button id="${type.type.name}" class="type-button">${captialize(type.type.name)}</button>`
}

function getPokemonTypes (pokemon) {
    pokemonTypes.innerHTML = ""
    pokemonTypes.innerHTML += pokemon.types.map( (type) => typeButton(type) ).join("")
}

searchBtn.addEventListener("click", checkPokemon)

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkPokemon()
        console.log("Ronald")
    }
})