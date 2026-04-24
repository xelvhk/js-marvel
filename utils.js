const PLACEHOLDER_IMAGE =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200"><rect width="100%" height="100%" fill="%23e5e7eb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-family="Arial" font-size="16">No image</text></svg>';

function mapHeroToCharacter(hero) {
    return {
        id: hero.id,
        name: hero.name || 'Unknown',
        thumbnail: hero?.images?.md || hero?.images?.sm || PLACEHOLDER_IMAGE,
        modified: hero?.biography?.firstAppearance
            ? `First appearance: ${hero.biography.firstAppearance}`
            : 'First appearance: unknown',
        description: [
            hero?.biography?.fullName ? `Full name: ${hero.biography.fullName}` : '',
            hero?.work?.occupation ? `Occupation: ${hero.work.occupation}` : '',
            hero?.biography?.placeOfBirth ? `Place of birth: ${hero.biography.placeOfBirth}` : '',
        ]
            .filter(Boolean)
            .join(' • '),
    };
}

function mapHeroesToMarvelCharacters(heroes, maxCharacters = 24) {
    return (Array.isArray(heroes) ? heroes : [])
        .filter((hero) => hero?.biography?.publisher === 'Marvel Comics')
        .slice(0, maxCharacters)
        .map(mapHeroToCharacter);
}

function filterCharactersByName(characters, query) {
    const normalized = (query || '').trim().toLowerCase();
    if (!normalized) {
        return characters;
    }
    return characters.filter((character) =>
        (character.name || '').toLowerCase().includes(normalized)
    );
}

function paginateCharacters(characters, page, pageSize) {
    const safePageSize = Math.max(1, pageSize || 1);
    const totalPages = Math.max(1, Math.ceil(characters.length / safePageSize));
    const safePage = Math.min(Math.max(1, page || 1), totalPages);
    const start = (safePage - 1) * safePageSize;
    const end = start + safePageSize;
    return {
        items: characters.slice(start, end),
        page: safePage,
        totalPages,
    };
}

const MarvelUtils = {
    PLACEHOLDER_IMAGE,
    mapHeroToCharacter,
    mapHeroesToMarvelCharacters,
    filterCharactersByName,
    paginateCharacters,
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MarvelUtils;
}

if (typeof window !== 'undefined') {
    window.MarvelUtils = MarvelUtils;
}
