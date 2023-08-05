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
window.addEventListener("load", init);
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const characters = yield getCharacters();
        console.log(characters);
        characters.forEach((char) => {
            console.log(char.gender);
        });
        const episodes = yield getEpisodes();
        console.log(episodes);
        episodes.forEach((epis) => {
            createEpisodeLink(epis);
        });
    });
}
function createEpisodeLink(episode) {
    const url = episode.url;
    const id = episode.id;
    const linkTitle = episode.episode;
    const link = document.createElement("a");
    link.classList.add('card');
    link.setAttribute("id", `cardID${id}`);
    link.setAttribute("src", url);
    link.innerText = linkTitle;
    accordionBody1.appendChild(link);
}
//# sourceMappingURL=index.js.map