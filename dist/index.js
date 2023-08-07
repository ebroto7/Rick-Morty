var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getCharacters, getEpisodes, getSingleCharacter, getSingleEpisode } from "./utils/API.js";
const accordionBody1 = document.querySelector("#accordionBody1");
const accordionBody2 = document.querySelector("#accordionBody2");
const accordionBody3 = document.querySelector("#accordionBody3");
const accordionBody4 = document.querySelector("#accordionBody4");
const accordionBody5 = document.querySelector("#accordionBody5");
const episodeMainContainer = document.querySelector('#episodeCardsMainContainer');
const singleEpisode_dataContainer = document.querySelector('#singleEpisode_dataContainer');
const singleEpisode_nameContainer = document.querySelector('#singleEpisode_nameContainer');
const singleEpisode_airDateContainer = document.querySelector('#singleEpisode_airDateContainer');
const singleEpisode_codeContainer = document.querySelector('#singleEpisode_codeContainer');
const singleEpisode_charcatersContainer = document.querySelector('#singleEpisode_charcatersContainer');
window.addEventListener("load", init);
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        getAllEpisodesLinks();
        const characters = yield getCharacters();
        console.log(characters);
        characters.forEach((char) => {
            console.log(char.gender);
        });
    });
}
function getAllEpisodesLinks() {
    return __awaiter(this, void 0, void 0, function* () {
        const episodes1 = yield getEpisodes(1);
        episodes1.forEach((epis) => {
            createEpisodeLink(epis);
        });
        const episodes2 = yield getEpisodes(2);
        episodes2.forEach((epis) => {
            createEpisodeLink(epis);
        });
        const episodes3 = yield getEpisodes(3);
        episodes3.forEach((epis) => {
            createEpisodeLink(epis);
        });
    });
}
function createEpisodeLink(episode) {
    const url = episode.url;
    const id = episode.id;
    const codeEpisode = episode.episode;
    const season = getSeasonFromEpisode(codeEpisode);
    const btn = document.createElement("button");
    btn.classList.add('episodelink');
    btn.classList.add('container-fluid');
    btn.setAttribute("id", `linkID${id}`);
    btn.setAttribute("src", url);
    btn.innerText = codeEpisode;
    btn.addEventListener('click', () => {
        createEpisodeView(url);
    });
    if (season == '1') {
        accordionBody1.appendChild(btn);
    }
    else if (season == '2') {
        accordionBody2.appendChild(btn);
    }
    else if (season == '3') {
        accordionBody3.appendChild(btn);
    }
    else if (season == '4') {
        accordionBody4.appendChild(btn);
    }
    else if (season == '5') {
        accordionBody5.appendChild(btn);
    }
}
function getSeasonFromEpisode(code) {
    const season = code.charAt(2);
    return season;
}
function createEpisodeView(url) {
    return __awaiter(this, void 0, void 0, function* () {
        singleEpisode_charcatersContainer.replaceChildren();
        const episode = yield getSingleEpisode(url);
        singleEpisode_nameContainer.innerText = episode.name;
        singleEpisode_airDateContainer.innerText = episode.air_date;
        singleEpisode_codeContainer.innerText = episode.episode;
        const characters = episode.characters;
        characters.forEach(char => {
            const url = char.toString();
            createCharacterdCard(url);
        });
    });
}
function createCharacterdCard(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const char = yield getSingleCharacter(url);
        const card = document.createElement("button");
        card.classList.add('card');
        card.style.width = '18rem';
        card.addEventListener('click', () => {
            console.log(char.name);
        });
        const img = document.createElement("img");
        img.src = char.image;
        img.classList.add('card-img-top');
        img.classList.add('d-none');
        img.classList.add('d-sm-block');
        const name = document.createElement("h4");
        name.classList.add('card-title');
        name.innerText = char.name;
        name.style.textAlign = 'center';
        const info = document.createElement("p");
        info.classList.add('card-title');
        info.innerText = `${char.species} | ${char.status}`;
        info.style.textAlign = 'center';
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(info);
        singleEpisode_charcatersContainer.appendChild(card);
    });
}
//# sourceMappingURL=index.js.map