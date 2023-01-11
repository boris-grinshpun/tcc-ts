import { useState, useEffect } from 'react'
import { ColumnGraph } from './components/graph/Graph'
import { Table } from './components/table/Table'
import { prepTableData } from './utils/table'
import { prepGraphData } from './utils/graph'
import { characterGetAll, locationGetAll, episodeGetAll } from './api'

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
    dimension: "",
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
        prepTableData(
          allLocations,
          allEpisodes
        ).then((data: CharCard) => {
          setCharacterCard(data)
        })
        prepGraphData(allCharacters, allEpisodes).then((data: Graph[]) => {
          setGraphData(data)
        })
      } catch (err) {
        console.log(err)
      }
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
