
import { Character } from "./types/Characters.js";
import { Episode } from "./types/Episodes.js";
import { getCharacters, getEpisodes, getSingleCharacter, getSingleEpisode, getSingleLocation } from "./utils/API.js";
 
const accordionBody1 = document.querySelector("#accordionBody1") as HTMLDivElement;
const accordionBody2 = document.querySelector("#accordionBody2") as HTMLDivElement;
const accordionBody3 = document.querySelector("#accordionBody3") as HTMLDivElement;
const accordionBody4 = document.querySelector("#accordionBody4") as HTMLDivElement;
const accordionBody5 = document.querySelector("#accordionBody5") as HTMLDivElement;

const mainPage = document.querySelector('#mainPage')


window.addEventListener("load", init)

async function init() {

    getAllEpisodesLinks()

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
    mainPage?.replaceChildren()
    const episode = await getSingleEpisode(url)

    const episodeMainContainer = document.createElement('div') as HTMLDivElement
    episodeMainContainer.classList.add('container-fluid')
    episodeMainContainer.classList.add('d-flex')
    episodeMainContainer.classList.add('justify-content-around')
    episodeMainContainer.classList.add('flex-wrap')

    const singleEpisode_dataContainer = document.createElement('div') as HTMLDivElement
    singleEpisode_dataContainer.id = "singleEpisode_dataContainer"
    singleEpisode_dataContainer.classList.add('container-fluid')

    const singleEpisode_charcatersContainer = document.createElement('div') as HTMLDivElement
    singleEpisode_charcatersContainer.id = "singleEpisode_charcatersContainer"

    singleEpisode_charcatersContainer.classList.add('flex-wrap')


    episodeMainContainer.appendChild(singleEpisode_dataContainer)
    episodeMainContainer.appendChild(singleEpisode_charcatersContainer)

    createEpisodeViewHeader(episode, singleEpisode_dataContainer)
    
    const characters = episode.characters
    characters.forEach(char => {
        const url = char.toString()
        createCharacterdCard(url, singleEpisode_charcatersContainer)
    });

    mainPage?.appendChild(episodeMainContainer)
}

function createEpisodeViewHeader(episode: Episode, container: HTMLDivElement) {
    const title = document.createElement('h1') as HTMLHeadingElement
    title.id = "singleEpisode_nameContainer"
    title.innerText = episode.name

    const singleEpisode_infoContainer = document.createElement('div') as HTMLDivElement
    singleEpisode_infoContainer.id = "singleEpisode_infoContainer"
    singleEpisode_infoContainer.classList.add('row')
    singleEpisode_infoContainer.classList.add('container-fluid')

    const code = document.createElement('h3') as HTMLHeadingElement
    code.id = "singleEpisode_codeContainer"
    code.classList.add('container-sm')
    code.innerText = episode.episode

    const date = document.createElement('h3') as HTMLHeadingElement
    date.id = "singleEpisode_codeContainer"
    date.classList.add('container-sm')
    date.innerText = episode.air_date


    singleEpisode_infoContainer.appendChild(code)
    singleEpisode_infoContainer.appendChild(date)

    container.appendChild(title)
    container.appendChild(singleEpisode_infoContainer)
}

async function createCharacterdCard(url: string, container: HTMLDivElement) {
    const char = await getSingleCharacter(url)

    const card = document.createElement("button");
    card.classList.add('card')
    card.style.width = '12rem'
    card.setAttribute("data-bs-toggle", "modal");
    card.setAttribute("data-bs-target", "#characterModal");
    card.addEventListener('click', () => {
        createCharacterdModal(char)
    })


    const img = document.createElement("img");
    img.src = char.image
    img.classList.add('card-img-top')
    img.classList.add('d-none')
    img.classList.add('d-sm-block')
    console.log(char.image)

    const name = document.createElement("h4");
    name.classList.add('card-title')
    name.innerText = char.name
    name.style.textAlign = 'center'

    const info = document.createElement("p");
    info.classList.add('card-title')
    info.innerText = `${char.species} | ${char.status}`
    info.style.textAlign = 'center'    


    card.appendChild(img)
    card.appendChild(name)
    card.appendChild(info)
    container.appendChild(card)

}

function createCharacterdModal(char: Character) {

    const modalCharacter_name = document.querySelector('#modalCharacter_name') as HTMLHeadingElement
    const modalCharacter_IMG = document.querySelector('#modalCharacter_IMG') as HTMLImageElement
    const modalCharacter_info = document.querySelector('#modalCharacter_info') as HTMLParagraphElement
    const modalCharacter_location_link = document.querySelector('#modalCharacter_location_link') as HTMLButtonElement
    modalCharacter_location_link.classList.add('btn')
    modalCharacter_location_link.classList.add('btn-outline-light') 

    const modalCharacter_EpisodeBtnContainer = document.querySelector('#modalCharacter_EpisodeBtnContainer') as HTMLDivElement
    modalCharacter_EpisodeBtnContainer.replaceChildren()

    modalCharacter_IMG.src = char.image

    modalCharacter_name.innerText = char.name
    modalCharacter_info.innerText = `${char.species} | ${char.status} | ${char.gender}`

    modalCharacter_location_link.innerText = char.location.name
    modalCharacter_location_link.setAttribute("data-bs-dismiss", "modal");

    modalCharacter_location_link.addEventListener('click', ()=> {
        createLocationView(char.location.url)
    })

    const apearences = char.episode
    apearences.forEach(async apear => {

        createApearenceButton(apear, modalCharacter_EpisodeBtnContainer)
    });

}
async function createApearenceButton(url: string, container: HTMLDivElement ) {
    const btn = document.createElement("button");
    btn.classList.add('container-fluid')
    // btn.classList.add('d-flex')
    btn.classList.add('justify-content-around')
    // btn.classList.add('flex-wrap')
    btn.classList.add('btn')
    btn.classList.add('btn-light')
    btn.setAttribute("data-bs-dismiss", "modal");
    btn.style.width = '100px'

    btn.setAttribute("src", url);

    const code = await getEpisodeCode(url)

    btn.innerText = code
    btn.addEventListener('click', () => {
        createEpisodeView(url)
    })
    container.appendChild(btn)
}

async function getEpisodeCode(url: string) {
    const episode = await getSingleEpisode(url)
    const code: string = episode.episode
    return code
}

async function createLocationView(url: string) {
     mainPage?.replaceChildren()
    const location = await getSingleLocation(url)
    
    const episodeMainContainer = document.createElement('div') as HTMLDivElement

    episodeMainContainer.classList.add('container-fluid')
    episodeMainContainer.classList.add('d-flex')
    episodeMainContainer.classList.add('justify-content-around')
    episodeMainContainer.classList.add('flex-wrap')

    const singleEpisode_dataContainer = document.createElement('div') as HTMLDivElement
    singleEpisode_dataContainer.id = "singleEpisode_dataContainer"
    singleEpisode_dataContainer.classList.add('container-fluid')

    const singleEpisode_charcatersContainer = document.createElement('div') as HTMLDivElement
    singleEpisode_charcatersContainer.id = "singleEpisode_charcatersContainer"
    singleEpisode_charcatersContainer.innerText = "RESIDENTS:"
    singleEpisode_charcatersContainer.style.color = "red"


    const title = document.createElement("h2");
    title.innerText = location.name
    const info = document.createElement("h4");
    info.innerText = `${location.type} | ${location.dimension}`

    const characters = location.residents
    characters.forEach(char => {
        const url = char.toString()
        createCharacterdCard(url, singleEpisode_charcatersContainer)
    });

    singleEpisode_dataContainer.appendChild(title)
    singleEpisode_dataContainer.appendChild(info)
    episodeMainContainer.appendChild(singleEpisode_dataContainer)
    episodeMainContainer.appendChild(singleEpisode_charcatersContainer)
    mainPage?.appendChild(episodeMainContainer)
    console.log(location)
}