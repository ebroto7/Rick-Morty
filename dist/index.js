var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getEpisodes, getSingleCharacter, getSingleEpisode, getSingleLocation } from "./utils/API.js";
const accordionBody1 = document.querySelector("#accordionBody1");
const accordionBody2 = document.querySelector("#accordionBody2");
const accordionBody3 = document.querySelector("#accordionBody3");
const accordionBody4 = document.querySelector("#accordionBody4");
const accordionBody5 = document.querySelector("#accordionBody5");
const mainPage = document.querySelector('#mainPage');
window.addEventListener("load", init);
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        getAllEpisodesLinks();
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
        mainPage === null || mainPage === void 0 ? void 0 : mainPage.replaceChildren();
        const episode = yield getSingleEpisode(url);
        const episodeMainContainer = document.createElement('div');
        episodeMainContainer.classList.add('container-fluid');
        episodeMainContainer.classList.add('d-flex');
        episodeMainContainer.classList.add('justify-content-around');
        episodeMainContainer.classList.add('flex-wrap');
        const singleEpisode_dataImageContainer = document.createElement('div');
        singleEpisode_dataImageContainer.id = "singleEpisode_dataImageContainer";
        singleEpisode_dataImageContainer.classList.add('container-fluid');
        singleEpisode_dataImageContainer.classList.add('d-flex');
        singleEpisode_dataImageContainer.classList.add('flex-wrap');
        const singleEpisode_imageContainer = document.createElement('div');
        singleEpisode_imageContainer.id = "singleEpisode_imageContainer";
        singleEpisode_imageContainer.classList.add('container-fluid');
        singleEpisode_imageContainer.classList.add('d-none');
        singleEpisode_imageContainer.classList.add('d-sm-block');
        const singleEpisode_dataContainer = document.createElement('div');
        singleEpisode_dataContainer.id = "singleEpisode_dataContainer";
        singleEpisode_dataContainer.classList.add('container-fluid');
        const singleEpisode_charcatersContainer = document.createElement('div');
        singleEpisode_charcatersContainer.id = "singleEpisode_charcatersContainer";
        singleEpisode_charcatersContainer.classList.add('flex-wrap');
        const episodeImage = document.createElement('div');
        episodeImage.classList.add("epsiodeLogoImage");
        singleEpisode_imageContainer.appendChild(episodeImage);
        singleEpisode_dataImageContainer.appendChild(singleEpisode_imageContainer);
        singleEpisode_dataImageContainer.appendChild(singleEpisode_dataContainer);
        episodeMainContainer.appendChild(singleEpisode_dataImageContainer);
        episodeMainContainer.appendChild(singleEpisode_charcatersContainer);
        createEpisodeViewHeader(episode, singleEpisode_dataContainer);
        const characters = episode.characters;
        characters.forEach(char => {
            const url = char.toString();
            createCharacterdCard(url, singleEpisode_charcatersContainer);
        });
        mainPage === null || mainPage === void 0 ? void 0 : mainPage.appendChild(episodeMainContainer);
    });
}
function createEpisodeViewHeader(episode, container) {
    const title = document.createElement('h1');
    title.id = "singleEpisode_nameContainer";
    title.innerText = episode.name;
    const singleEpisode_infoContainer = document.createElement('div');
    singleEpisode_infoContainer.id = "singleEpisode_infoContainer";
    singleEpisode_infoContainer.classList.add('row');
    singleEpisode_infoContainer.classList.add('container-fluid');
    const code = document.createElement('h3');
    code.id = "singleEpisode_codeContainer";
    code.classList.add('container-sm');
    code.innerText = episode.episode;
    const date = document.createElement('h3');
    date.id = "singleEpisode_codeContainer";
    date.classList.add('container-sm');
    date.innerText = episode.air_date;
    singleEpisode_infoContainer.appendChild(code);
    singleEpisode_infoContainer.appendChild(date);
    container.appendChild(title);
    container.appendChild(singleEpisode_infoContainer);
}
function createCharacterdCard(url, container) {
    return __awaiter(this, void 0, void 0, function* () {
        container.replaceChildren();
        const char = yield getSingleCharacter(url);
        const card = document.createElement("button");
        card.classList.add('card');
        card.style.width = '12rem';
        card.setAttribute("data-bs-toggle", "modal");
        card.setAttribute("data-bs-target", "#characterModal");
        card.addEventListener('click', () => {
            createCharacterdModal(char);
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
        container.appendChild(card);
    });
}
function createCharacterdModal(char) {
    const modalCharacter_name = document.querySelector('#modalCharacter_name');
    const modalCharacter_IMG = document.querySelector('#modalCharacter_IMG');
    const modalCharacter_info = document.querySelector('#modalCharacter_info');
    const modalCharacter_location_link = document.querySelector('#modalCharacter_location_link');
    const modalCharacter_EpisodeBtnContainer = document.querySelector('#modalCharacter_EpisodeBtnContainer');
    modalCharacter_EpisodeBtnContainer.replaceChildren();
    modalCharacter_IMG.src = char.image;
    modalCharacter_name.innerText = char.name;
    modalCharacter_info.innerText = `${char.species} | ${char.status} | ${char.gender}`;
    const locationLinkButton = createLocationLinkButton(char);
    modalCharacter_location_link.replaceChildren();
    modalCharacter_location_link.appendChild(locationLinkButton);
    const apearences = char.episode;
    apearences.forEach((apear) => __awaiter(this, void 0, void 0, function* () {
        createApearenceButton(apear, modalCharacter_EpisodeBtnContainer);
    }));
}
function createLocationLinkButton(char) {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-outline-light');
    button.innerText = char.location.name;
    button.style.color = "lightgreen";
    button.setAttribute("data-bs-dismiss", "modal");
    button.addEventListener('click', () => {
        createLocationView(char.location.url);
    });
    return button;
}
function createApearenceButton(url, container) {
    return __awaiter(this, void 0, void 0, function* () {
        const btn = document.createElement("button");
        btn.classList.add('container-fluid');
        btn.classList.add('justify-content-around');
        btn.classList.add('btn');
        btn.classList.add('btn-light');
        btn.setAttribute("data-bs-dismiss", "modal");
        btn.style.width = '100px';
        btn.setAttribute("src", url);
        const code = yield getEpisodeCode(url);
        btn.innerText = code;
        btn.addEventListener('click', () => {
            createEpisodeView(url);
        });
        container.appendChild(btn);
    });
}
function getEpisodeCode(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const episode = yield getSingleEpisode(url);
        const code = episode.episode;
        return code;
    });
}
function createLocationView(url) {
    return __awaiter(this, void 0, void 0, function* () {
        mainPage === null || mainPage === void 0 ? void 0 : mainPage.replaceChildren();
        const location = yield getSingleLocation(url);
        const episodeMainContainer = document.createElement('div');
        episodeMainContainer.id = 'locationContainer';
        episodeMainContainer.classList.add('container-fluid');
        episodeMainContainer.classList.add('d-flex');
        episodeMainContainer.classList.add('justify-content-around');
        episodeMainContainer.classList.add('flex-wrap');
        const singleEpisode_dataImageContainer = document.createElement('div');
        singleEpisode_dataImageContainer.id = "singleEpisode_dataImageContainer";
        singleEpisode_dataImageContainer.classList.add('container-fluid');
        singleEpisode_dataImageContainer.classList.add('d-flex');
        singleEpisode_dataImageContainer.classList.add('flex-wrap');
        const singleEpisode_imageContainer = document.createElement('div');
        singleEpisode_imageContainer.id = "singleEpisode_imageContainer";
        singleEpisode_imageContainer.classList.add('container-fluid');
        singleEpisode_imageContainer.classList.add('d-none');
        singleEpisode_imageContainer.classList.add('d-sm-block');
        const singleEpisode_dataContainer = document.createElement('div');
        singleEpisode_dataContainer.id = "singleEpisode_dataContainer";
        singleEpisode_dataContainer.classList.add('container-fluid');
        const singleEpisode_charcatersContainer = document.createElement('div');
        singleEpisode_charcatersContainer.id = "singleEpisode_charcatersContainer";
        const title = document.createElement("h2");
        title.innerText = location.name;
        const info = document.createElement("h4");
        info.innerText = `${location.type} | ${location.dimension}`;
        const locationImage = document.createElement('div');
        locationImage.classList.add("planetLogoImage");
        singleEpisode_dataContainer.appendChild(locationImage);
        singleEpisode_dataContainer.appendChild(title);
        singleEpisode_dataContainer.appendChild(info);
        singleEpisode_imageContainer.appendChild(locationImage);
        singleEpisode_dataImageContainer.appendChild(singleEpisode_imageContainer);
        singleEpisode_dataImageContainer.appendChild(singleEpisode_dataContainer);
        episodeMainContainer.appendChild(singleEpisode_dataImageContainer);
        episodeMainContainer.appendChild(singleEpisode_charcatersContainer);
        const characters = location.residents;
        characters.forEach(char => {
            const url = char.toString();
            createCharacterdCard(url, singleEpisode_charcatersContainer);
        });
        mainPage === null || mainPage === void 0 ? void 0 : mainPage.appendChild(episodeMainContainer);
    });
}
//# sourceMappingURL=index.js.map