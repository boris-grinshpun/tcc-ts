import {
    Character,
    CharacterAppearances,
    CharNameIdsHash,
    Graph,
    Episode
} from '../../interfaces'

import {
    calcCharAppearanceInEpisodes,
    graphCharacters
} from '../../shared-utils'

export async function prepGraphData(
    allCharacters: Character[],
    allEpisodes: Episode[]
): Promise<Graph[]> {
    try {
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

        let characterAppearance: CharacterAppearances = Object.values(graphCharactersData)
            .reduce((acc: any, character: any) => {
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
        return new Promise(resolve => resolve(prepGraphData))
    } catch (err) {
        return new Promise((resolve, reject) => {
            reject(err)
        })
    }
}