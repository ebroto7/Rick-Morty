
import { Character } from "./types/Characters.js";
import { Episode } from "./types/Episodes.js";
import { getCharacters, getEpisodes, getSingleCharacter, getSingleEpisode } from "./utils/API.js";
 
const accordionBody1 = document.querySelector("#accordionBody1") as HTMLDivElement;
const accordionBody2 = document.querySelector("#accordionBody2") as HTMLDivElement;
const accordionBody3 = document.querySelector("#accordionBody3") as HTMLDivElement;
const accordionBody4 = document.querySelector("#accordionBody4") as HTMLDivElement;
const accordionBody5 = document.querySelector("#accordionBody5") as HTMLDivElement;

const episodeMainContainer = document.querySelector('#episodeCardsMainContainer') as HTMLDivElement;
const singleEpisode_dataContainer = document.querySelector('#singleEpisode_dataContainer') as HTMLDivElement;
const singleEpisode_nameContainer = document.querySelector('#singleEpisode_nameContainer') as HTMLDivElement;
// const singleEpisode_infoContainer = document.querySelector('#singleEpisode_infoContainer') as HTMLDivElement;
const singleEpisode_airDateContainer = document.querySelector('#singleEpisode_airDateContainer') as HTMLDivElement;
const singleEpisode_codeContainer = document.querySelector('#singleEpisode_codeContainer') as HTMLDivElement;
const singleEpisode_charcatersContainer = document.querySelector('#singleEpisode_charcatersContainer') as HTMLDivElement;


window.addEventListener("load", init)

async function init() {

    getAllEpisodesLinks()

    const characters = await getCharacters();
    console.log(characters)

    characters.forEach((char) => {
        console.log(char.gender)
    })
}

async function getAllEpisodesLinks() {
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
    btn.classList.add('episodelink')
    btn.classList.add('container-fluid')
    btn.setAttribute("id", `linkID${id}`);
    btn.setAttribute("src", url);
    btn.innerText = codeEpisode
    btn.addEventListener('click', () => {
        createEpisodeView(url)
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


async function createEpisodeView(url: string) {
    singleEpisode_charcatersContainer.replaceChildren()


    const episode = await getSingleEpisode(url)

    singleEpisode_nameContainer.innerText = episode.name
    singleEpisode_airDateContainer.innerText = episode.air_date
    singleEpisode_codeContainer.innerText = episode.episode

    const characters = episode.characters
    characters.forEach(char => {
        // const card = document.createElement('h3')
        // card.innerText = char.toString()
        // singleEpisode_charcatersContainer.appendChild(card)
        const url = char.toString()

        createCharacterdCard(url)
    });
    

}

async function createCharacterdCard(url: string) {
    const char = await getSingleCharacter(url)

    const card = document.createElement("button");
    card.classList.add('card')
    card.style.width = '18rem'
    card.addEventListener('click', () => {
        console.log(char.name)
    })


    const img = document.createElement("img");
    img.src = char.image
    img.classList.add('card-img-top')

    const name = document.createElement("h4");
    name.classList.add('card-title')
    name.innerText = char.name
    name.style.textAlign = 'center'


    card.appendChild(img)
    card.appendChild(name)
    singleEpisode_charcatersContainer.appendChild(card)

}