import { Character } from "../types/Characters";
import { Episode } from "../types/Episodes";
import { Location } from "../types/Location"

const url = "https://rickandmortyapi.com/api/"
const urlCharacters = `${url}/character`
const urlEpisodes = `${url}/episode?page=`

export async function getCharacters(): Promise<Character[]> {
   try {
        const response = await fetch(urlCharacters);
        const data = await response.json()
        return data.results;
    } catch (error) {
        throw new Error ("something has gone wrong")
        // make a modal for show error
    }
}

export async function getSingleCharacter(url: string): Promise<Character> {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data;
    } catch (error) {
        throw new Error ("something has gone wrong")
        // make a modal for show error
    }
}

export async function getEpisodes(page: Number): Promise<Episode[]>  {
    try {
        let episodesPageUrl: string = `${urlEpisodes}${page}`
        const response = await fetch(episodesPageUrl);
        const data = await response.json()
        return data.results;
    } catch (error) {
        throw new Error ("something has gone wrong")
        // make a modal for show error
    }
}

export async function getSingleEpisode(url: string): Promise<Episode> {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error ("something has gone wrong")
        // make a modal for show error
    }
}

export async function getSingleLocation(url: string): Promise<Location> {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data 
    } catch (error) {
        throw new Error ("something has gone wrong")
        // make a modal for show error
    }
}
