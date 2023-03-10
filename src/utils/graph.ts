import {
    updateCharacterAppearanceInEpisodes
} from './shared'

const graphCharacters: string[] = ["Abradolf Lincler", "Arcade Alien", "Morty Smith", "Birdperson", "Mr. Meeseeks"]

export async function prepGraphData(
    allCharacters: Character[],
    allEpisodes: Episode[]
): Promise<Graph[]> {
    let result: Promise<Graph[]>
    try {
        let graphCharactersData: CharNameIdsHash = allCharacters.reduce((acc: CharNameIdsHash, character: Character) => {
            let characterName: string = character.name
            if (graphCharacters.includes(characterName)) {
                if (!acc.hasOwnProperty(characterName)) {
                    acc[characterName] = { ids: [] }
                }
                acc[characterName].ids.push(character.id)
            }
            return acc
        }, {})

        let characterAppearance: GraphCharacterAppearances = Object.values(graphCharactersData)
            .reduce((acc: GraphCharacterAppearances, {ids}) => {
                let appearanceById = ids.reduce((acc: GraphCharacterAppearances, id: number) => {
                    acc[id.toString()] = { appearances: 0 }
                    return acc
                }, {})
                return { ...acc, ...appearanceById }
            }, {})
        updateCharacterAppearanceInEpisodes(characterAppearance, allEpisodes)
        const prepGraphData: Graph[] = []

        for (const [name, { ids }] of Object.entries(graphCharactersData)) {
            const totalAppearances: number = ids.reduce((acc: number, id: number) => {

                acc += characterAppearance[id.toString()].appearances
                return acc
            }, 0)
            prepGraphData.push({ name, totalAppearances })
        }
        result = new Promise(resolve => resolve(prepGraphData))
    } catch (err) {
        result = new Promise((resolve, reject) => {
            reject(err)
        })
    }
    return result
}

const colors = ["#fff2cb", "#daf7d0", "#cde8ed", "#ffc6df", "#ffe2c5"]

export function getColor(index: number):string {
  return colors[index]
}