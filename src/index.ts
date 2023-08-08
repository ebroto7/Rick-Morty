
import { Character } from "./types/Characters.js";
import { Episode } from "./types/Episodes.js";
import { getCharacters, getEpisodes, getSingleCharacter, getSingleEpisode, getSingleLocation } from "./utils/API.js";
 
const accordionBody1 = document.querySelector("#accordionBody1") as HTMLDivElement;
const accordionBody2 = document.querySelector("#accordionBody2") as HTMLDivElement;
const accordionBody3 = document.querySelector("#accordionBody3") as HTMLDivElement;
const accordionBody4 = document.querySelector("#accordionBody4") as HTMLDivElement;
const accordionBody5 = document.querySelector("#accordionBody5") as HTMLDivElement;

const episodeMainContainer = document.querySelector('#episodeCardsMainContainer') as HTMLDivElement;
const singleEpisode_dataContainer = document.querySelector('#singleEpisode_dataContainer') as HTMLDivElement;
const singleEpisode_nameContainer = document.querySelector('#singleEpisode_nameContainer') as HTMLDivElement;
const singleEpisode_airDateContainer = document.querySelector('#singleEpisode_airDateContainer') as HTMLDivElement;
const singleEpisode_codeContainer = document.querySelector('#singleEpisode_codeContainer') as HTMLDivElement;
const singleEpisode_charcatersContainer = document.querySelector('#singleEpisode_charcatersContainer') as HTMLDivElement;


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
    singleEpisode_charcatersContainer.replaceChildren()


    const episode = await getSingleEpisode(url)

    singleEpisode_nameContainer.innerText = episode.name
    singleEpisode_airDateContainer.innerText = episode.air_date
    singleEpisode_codeContainer.innerText = episode.episode

    const characters = episode.characters


const hello = characters[1]


    characters.forEach(char => {
        const url = char.toString()
        createCharacterdCard(url)
    });
}

async function createCharacterdCard(url: string) {
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
    singleEpisode_charcatersContainer.appendChild(card)

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
    apearences.forEach(apear => {
        const btn = document.createElement("button");
        btn.classList.add('episodelink')
        btn.classList.add('container-fluid')
        btn.classList.add('btn')
        btn.classList.add('btn-light')
        btn.setAttribute("data-bs-dismiss", "modal");

        
        btn.setAttribute("src", apear);
       
        

        const code = getEpisodeCode(apear)
        btn.innerText = 'hello world'
        btn.addEventListener('click', () => {
            createEpisodeView(apear)

        })
        modalCharacter_EpisodeBtnContainer.appendChild(btn)
        console.log(apear)
    });

}

async function getEpisodeCode(url: string): Promise<string> {
    const episode = await getSingleEpisode(url)
    const code: string = episode.episode
    return code
}

async function createLocationView(url: string) {
    const char = await getSingleLocation(url)
    console.log(char)
    console.log("chanchito feliz")
}