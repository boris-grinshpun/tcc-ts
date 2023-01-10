export function calcCharAppearanceInEpisodes(charAppearanceInEpisodes: CharacterAppearances, allEpisodes: Episode[]) {
  return allEpisodes.reduce((acc: CharacterAppearances, episode: Episode) => {
    episode.characters.forEach((character: string) => {
      const characterId: string = character.substring(character.lastIndexOf('/') + 1, character.length).toString()
      if (charAppearanceInEpisodes.hasOwnProperty(characterId)) {
        charAppearanceInEpisodes[characterId].appearances += 1
      }
    })
    return acc
  }, charAppearanceInEpisodes)
}

export function sortByKey(key: string) {
  return (a: Object, b: Object) => Object.values(a)[0][key] > Object.values(b)[0][key] ? 1 : -1
}

export const earthVal = "Earth (C-137)"
