import { Character } from "../types/Characters";
import { Episode } from "../types/Episodes";

const url = "https://rickandmortyapi.com/api/"
const urlCharacters = `${url}/character`
const urlEpisodes = `${url}/episode`

export async function getCharacters(): Promise<Character[]> {
    const response = await fetch(urlCharacters);
    const data = await response.json()
    return data.results;
}

export async function getEpisodes(): Promise<Episode[]>  {
    const response = await fetch(urlEpisodes);
    const data = await response.json()
    return data.results;
}