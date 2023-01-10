import { useState, useEffect } from 'react'
import './App.scss'
import { ColumnGraph } from './components/graph/Graph'
import { Table } from './components/table/Table'
import { characterGetAll, locationGetAll, getLocation, episodeGetAll, getCharactersFromIds } from './api/api'
import { calcCharAppearanceInEpisodes, sortByKey, earthVal, graphCharacters } from './utils'
import { Character, CharacterAppearances, CharNameIdsHash, LocationData, CharCard, Graph, Location, Episode } from './interfaces'

function App() {
  let allCharacters: Character[],
    allEpisodes: Episode[],
    allLocations: Location[],
    earthCharacters: Character[],
    charAppearanceInEpisodes: CharacterAppearances,
    data: Array<any>

  const [characterCard, setCharacterCard] = useState<CharCard>({
    name: "",
    image: "",
    status: "",
    species: "",
    gender: "",
    characterLocation: "",
    dimension: " ",
    appearances: 0
  })
  const [graphData, setGraphData] = useState<Graph[]>([])

  useEffect(() => {
    async function start() {
      try {
        data = await Promise.all([episodeGetAll(), locationGetAll(), characterGetAll()])
        allEpisodes = data[0]
        allLocations = data[1]
        allCharacters = data[2]
        prepTableData()
        prepGraphData()
      } catch (err) {
      }
    }
    async function prepTableData() {
      try {
        const earthLocation: any = allLocations.find((location: Location) => location.name === earthVal) ?? []
        const residentsIds: number[] = earthLocation?.residents.map((resident: String) => {
          return resident.substring(resident.lastIndexOf('/') + 1, resident.length).toString()
        })
        earthCharacters = await getCharactersFromIds(residentsIds)
        charAppearanceInEpisodes = earthCharacters.reduce((acc: any, character: any) => {
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
        const allMinAppearances = minAppearancesList.filter(item => Object.values(item)[0].appearances === minAppearances)
        allMinAppearances.sort(sortByKey('name'))
        const [characterId, characterCardInit]: [string, CharCard] = Object.entries(allMinAppearances[0])[0]
        getLocation(characterId)
          .then((data: LocationData) => {
            characterCardInit.dimension = data.dimension
            setCharacterCard(characterCardInit)
          })
      } catch (err) {
        console.log(err)
      }
    }
    async function prepGraphData() {
      let graphCharactersData: CharNameIdsHash = allCharacters.reduce((acc: any, character: any) => {
        let characterName = character.name
        if (graphCharacters.includes(characterName)) {
          if (!acc.hasOwnProperty(characterName)) {
            acc[characterName] = { ids: [] }
          }
          acc[characterName].ids.push(character.id)
        }
        return acc
      }, {})
      let characterAppearance: CharacterAppearances = Object.values(graphCharactersData).reduce((acc: any, character: any) => {
        let appearanceById = character.ids.reduce((acc: any, id: Number) => {
          acc[id.toString()] = { appearances: 0 }
          return acc
        }, {})
        return { ...acc, ...appearanceById }
      }, [])
      characterAppearance = calcCharAppearanceInEpisodes(characterAppearance, allEpisodes)
      const prepGraphData: Graph[] = []
      for (const [name, { ids }] of Object.entries(graphCharactersData)) {
        const totalAppearances: number = ids.reduce((acc: any, id: any) => {

          acc += characterAppearance[id.toString()].appearances
          return acc
        }, 0)
        prepGraphData.push({ name, totalAppearances })
      }
      setGraphData(prepGraphData)
    }

    start()
  }, [])
  return (
    <div className="App">
      <div><Table card={characterCard} /></div>
      <br />
      <div><ColumnGraph data={graphData} /></div>
    </div>
  )
}

export default App
