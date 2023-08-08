export interface Character {
    id:       number;
    name:     string;
    status:   CharacterStatus;
    species:  CharacterSpecies;
    type:     string;
    gender:   Gender;
    origin:   Planet;
    location: Planet;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date;
}

export enum Gender {
    Female = "Female",
    Male = "Male",
    Genderless = "Genderless",
    Unknown = "unknown",
}

export interface Planet {
    name: string;
    url:  string;
}

export enum CharacterSpecies {
    Alien = "Alien",
    Human = "Human",
}

export enum CharacterStatus {
    Alive = "Alive",
    Dead = "Dead",
    Unknown = "unknown",
}