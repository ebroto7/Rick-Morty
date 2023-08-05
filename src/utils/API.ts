import { Character } from "../types/Characters";
import { Episode } from "../types/Episodes";

const url = "https://rickandmortyapi.com/api/"
const urlCharacters = `${url}/character`
const urlEpisodes = `${url}/episode?page=`

export async function getCharacters(): Promise<Character[]> {
    const response = await fetch(urlCharacters);
    const data = await response.json()
    return data.results;
}

export async function getEpisodes(page: Number): Promise<Episode[]>  {
    let episodesPageUrl: string = `${urlEpisodes}${page}`
   
    const response = await fetch(episodesPageUrl);
    const data = await response.json()
    return data.results;
}