console.log('hello world')

import { Character } from "./types/Characters.js";
import { getCharacters, getEpisodes } from "./utils/API.js";
 
window.addEventListener("load", init)

async function init() {
    const characters = await getCharacters();
    console.log(characters)

    characters.forEach((char) => {
        console.log(char.gender)
    })



    const episodes = await getEpisodes();
    console.log(episodes)
}