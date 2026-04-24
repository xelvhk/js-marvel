const test = require('node:test');
const assert = require('node:assert/strict');

const {
    mapHeroToCharacter,
    filterCharactersByName,
    paginateCharacters,
} = require('../utils.js');

test('mapHeroToCharacter maps hero fields to UI-friendly structure', () => {
    const hero = {
        id: 1,
        name: 'Spider-Man',
        images: { md: 'https://example.com/spider.jpg' },
        biography: {
            firstAppearance: 'Amazing Fantasy #15',
            fullName: 'Peter Parker',
            placeOfBirth: 'New York',
        },
        work: {
            occupation: 'Photographer',
        },
    };

    const result = mapHeroToCharacter(hero);
    assert.equal(result.id, 1);
    assert.equal(result.name, 'Spider-Man');
    assert.equal(result.thumbnail, 'https://example.com/spider.jpg');
    assert.match(result.description, /Peter Parker/);
});

test('filterCharactersByName applies case-insensitive search', () => {
    const characters = [
        { name: 'Spider-Man' },
        { name: 'Iron Man' },
        { name: 'Thor' },
    ];

    const result = filterCharactersByName(characters, 'man');
    assert.equal(result.length, 2);
});

test('paginateCharacters returns safe page and correct slice', () => {
    const characters = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
    const result = paginateCharacters(characters, 2, 4);

    assert.equal(result.page, 2);
    assert.equal(result.totalPages, 3);
    assert.deepEqual(
        result.items.map((item) => item.id),
        [5, 6, 7, 8]
    );
});
