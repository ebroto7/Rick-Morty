console.log('hello world')

import { getCharacters } from "./utils/API.js";
 
window.addEventListener("load", init)

async function init() {
    const charactersList = document.querySelector('#charactersList')
    const characters = await getCharacters();
    console.log(characters)
}