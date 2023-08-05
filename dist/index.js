var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log('hello world');
import { getCharacters, getEpisodes } from "./utils/API.js";
const episodeCardsMainContainer = document.querySelector('#episodeCardsMainContainer');
const accordionBody1 = document.querySelector("#accordionBody1");
const accordionBody2 = document.querySelector("#accordionBody2");
const accordionBody3 = document.querySelector("#accordionBody3");
const accordionBody4 = document.querySelector("#accordionBody4");
const accordionBody5 = document.querySelector("#accordionBody5");
window.addEventListener("load", init);
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const characters = yield getCharacters();
        console.log(characters);
        characters.forEach((char) => {
            console.log(char.gender);
        });
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
    btn.classList.add('link');
    btn.classList.add('container-fluid');
    btn.setAttribute("id", `linkID${id}`);
    btn.setAttribute("src", url);
    btn.innerText = codeEpisode;
    btn.addEventListener('click', () => {
        console.log(url);
        console.log(season);
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
//# sourceMappingURL=index.js.map