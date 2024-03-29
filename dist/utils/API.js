var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = "https://rickandmortyapi.com/api/";
const urlCharacters = `${url}/character`;
const urlEpisodes = `${url}/episode?page=`;
export function getCharacters() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(urlCharacters);
            const data = yield response.json();
            return data.results;
        }
        catch (error) {
            throw new Error("something has gone wrong");
        }
    });
}
export function getSingleCharacter(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            return data;
        }
        catch (error) {
            throw new Error("something has gone wrong");
        }
    });
}
export function getEpisodes(page) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let episodesPageUrl = `${urlEpisodes}${page}`;
            const response = yield fetch(episodesPageUrl);
            const data = yield response.json();
            return data.results;
        }
        catch (error) {
            throw new Error("something has gone wrong");
        }
    });
}
export function getSingleEpisode(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            return data;
        }
        catch (error) {
            throw new Error("something has gone wrong");
        }
    });
}
export function getSingleLocation(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            return data;
        }
        catch (error) {
            throw new Error("something has gone wrong");
        }
    });
}
//# sourceMappingURL=API.js.map