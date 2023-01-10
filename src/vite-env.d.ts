/// <reference types="vite/client" />

 interface Location {
    name: string,
    residents: string[]
  }
  
 interface Character {
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
  
 interface CharacterAppearances {
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
  
 interface CharNameIdsHash {
    [key: string] : {
      ids: [],
    }
  }
  
 interface LocationData {
    dimension: string
  }

 interface CharCard {
    name: string,
    appearances: number,
    characterLocation: string,
    dimension: string,
    gender: string,
    image: string,
    species: string,
    status: string,
  }
  
 interface Graph {
    name: string,
    totalAppearances: number
  }

 interface Episode {
    characters: string[]
  }