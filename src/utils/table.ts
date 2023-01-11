import {
  calcCharAppearanceInEpisodes,
  sortByKey,
  earthVal 
} from './shared'
import {
  getLocation,
  getCharactersFromIds
} from '../api'

export async function prepTableData(
        allLocations: Location[],
        allEpisodes: Episode[]
    ): Promise<CharCard> {
   let result: Promise<CharCard>
    try {
      const earthLocation: any = allLocations.find((location: Location) => location.name === earthVal) ?? []
      const residentsIds: number[] = earthLocation?.residents.map((resident: String) => {
        return resident.substring(resident.lastIndexOf('/') + 1, resident.length).toString()
      })

      const earthCharacters: Character[] = await getCharactersFromIds(residentsIds)
      let charAppearanceInEpisodes: CharacterAppearances = earthCharacters.reduce((acc: any, character: any) => {
        const {
          name,
          status,
          species,
          gender,
          image,
          location: { name: characterLocation }
        } = character
        acc[character.id.toString()] = {
          appearances: 0,
          name,
          characterLocation,
          dimension: '',
          status,
          species,
          gender,
          image
        }
        return acc
      }, {})

      charAppearanceInEpisodes = calcCharAppearanceInEpisodes(charAppearanceInEpisodes, allEpisodes)

      let minAppearancesList: CharacterAppearances[] = []
      for (let id in charAppearanceInEpisodes) {
        minAppearancesList.push({ [id]: charAppearanceInEpisodes[id] })
      }

      minAppearancesList.sort(sortByKey('appearances'))

      const minAppearances = Object.values(minAppearancesList[0])[0].appearances

      const allMinAppearances = minAppearancesList
        .filter(item => Object.values(item)[0].appearances === minAppearances)

      allMinAppearances.sort(sortByKey('name'))

      const [characterId, characterCardInit]: [string, CharCard] = Object.entries(allMinAppearances[0])[0]
      
      result = new Promise((resolve)=>{
          getLocation(characterId)
            .then((data: LocationData) => {
              characterCardInit.dimension = data.dimension
              return resolve(characterCardInit)
            })
    
      })
    } catch (err) {
        result = new Promise((resolve, reject)=>{
        reject(err)
      })
    }
    return result
  }