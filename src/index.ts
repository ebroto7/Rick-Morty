console.log('hello world')

import { Character } from "./types/Characters.js";
import { Episode } from "./types/Episodes.js";
import { getCharacters, getEpisodes } from "./utils/API.js";
 
const episodeCardsMainContainer = document.querySelector('#episodeCardsMainContainer') as HTMLDivElement;
const accordionBody1 = document.querySelector("#accordionBody1") as HTMLDivElement;
const accordionBody2 = document.querySelector("#accordionBody2") as HTMLDivElement;
const accordionBody3 = document.querySelector("#accordionBody3") as HTMLDivElement;
const accordionBody4 = document.querySelector("#accordionBody4") as HTMLDivElement;
const accordionBody5 = document.querySelector("#accordionBody5") as HTMLDivElement;

window.addEventListener("load", init)

async function init() {
    const characters = await getCharacters();
    console.log(characters)

    characters.forEach((char) => {
        console.log(char.gender)
    })


    const episodes1 = await getEpisodes(1);
    episodes1.forEach((epis) => {
        createEpisodeLink(epis)        
    })
    const episodes2 = await getEpisodes(2);
    episodes2.forEach((epis) => {
        createEpisodeLink(epis)        
    })
    const episodes3 = await getEpisodes(3);
    episodes3.forEach((epis) => {
        createEpisodeLink(epis)        
    })
   

}

function createEpisodeLink(episode: Episode) {
    const url = episode.url
    const id = episode.id
    const codeEpisode = episode.episode
    const season = getSeasonFromEpisode(codeEpisode)
    const btn = document.createElement("button");
    btn.classList.add('link')
    btn.classList.add('container-fluid')
    btn.setAttribute("id", `linkID${id}`);
    btn.setAttribute("src", url);
    btn.innerText = codeEpisode
    btn.addEventListener('click', () => {
        console.log(url)
        console.log(season)
    })
    if (season == '1') {
        accordionBody1.appendChild(btn)
    } else  if (season == '2') {
        accordionBody2.appendChild(btn)
    } else  if (season == '3') {
        accordionBody3.appendChild(btn)
    }  else  if (season == '4') {
        accordionBody4.appendChild(btn)
    }  else  if (season == '5') {
        accordionBody5.appendChild(btn)
    }  
}

function getSeasonFromEpisode(code: string) {
   const season = code.charAt(2)
   return season
}