
export interface Location {
    name: string,
    residents: string[]
  }
  
  export interface Character {
    id: number,
    name: string,
    status: string,
    species: string,
    gender: string,
    image: string,
    location: {
      name: string
    }
  }
  
  export interface CharacterAppearances {
    [id: string]: {
      appearances: number,
      name: string,
      characterLocation: string,
      dimension: string,
      status: string,
      species: string,
      gender: string,
      image: string
    }
  }
  
  export interface CharNameIdsHash {
    [key: string] : {
      ids: [],
    }
  }
  
  export interface LocationData {
    dimension: string
  }

  export interface CharCard {
    name: string,
    appearances: number,
    characterLocation: string,
    dimension: string,
    gender: string,
    image: string,
    species: string,
    status: string,
  }
  
  export interface Graph {
    name: string,
    totalAppearances: number
  }

  export interface Episode {
    characters: string[]
  }