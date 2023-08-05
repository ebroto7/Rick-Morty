console.log('hello world')

import { Character } from "./types/Characters.js";
import { Episode } from "./types/Episodes.js";
import { getCharacters, getEpisodes } from "./utils/API.js";
 
const episodeCardsMainContainer = document.querySelector('#episodeCardsMainContainer') as HTMLDivElement;
const accordionBody1 = document.querySelector("#accordionBody1") as HTMLDivElement;
const accordionBody2 = document.querySelector("#accordionBody2") as HTMLDivElement;
const accordionBody3 = document.querySelector("#accordionBody3") as HTMLDivElement;

window.addEventListener("load", init)

async function init() {
    const characters = await getCharacters();
    console.log(characters)

    characters.forEach((char) => {
        console.log(char.gender)
    })



    const episodes = await getEpisodes();
    console.log(episodes)
    episodes.forEach((epis) => {
        createEpisodeLink(epis)        
    })

}

function createEpisodeLink(episode: Episode) {
    const url = episode.url
    const id = episode.id
    const linkTitle = episode.episode
    const link = document.createElement("a");
    link.classList.add('card')
    link.setAttribute("id", `cardID${id}`);
    link.setAttribute("src", url);
    link.innerText = linkTitle

    
    accordionBody1.appendChild(link)

    console.log(link)
}