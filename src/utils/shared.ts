export function updateCharacterAppearanceInEpisodes(
  charAppearanceInEpisodes: CharacterAppearances|GraphCharacterAppearances,
  allEpisodes: Episode[]
): CharacterAppearances|GraphCharacterAppearances {
  return allEpisodes.reduce((acc: CharacterAppearances|GraphCharacterAppearances, episode: Episode) => {
    episode.characters.forEach((characterUrl: string) => {
      const characterId: string = characterUrl.substring(characterUrl.lastIndexOf('/') + 1, characterUrl.length).toString()
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
