/**
 * Получить карточку персонажа
 *
 * @param character
 * @returns {string}
 */
function getCharacterCard(character) {
    return `
        <div class="card mb-3 col-sm-12 col-md-6 col-lg-4">
            <div class="row g-0">
                <div class="col-4">
                    <img src="${character.thumbnail}"
                         style="max-width: 100%;"
                         alt="${character.name}"
                    >
                </div>
                <div class="col-8">
                    <div class="card-body">
                        <h5 class="card-title">${character.name}</h5>
                        <button type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal-${character.id}"
                                class="btn btn-secondary btn-sm"
                                aria-label="Подробнее о персонаже ${character.name}"
                        >Подробнее</button>
                    </div>
                </div>
            </div>
        </div>
        `;
}

/**
 * Получить модальное окно персонажа
 *
 * @param character
 * @returns {string}
 */
function getCharacterModal(character) {
    return `
        <div id="exampleModal-${character.id}"
             tabindex="-1"
             aria-labelledby="exampleModalLabel-${character.id}"
             class="modal fade"
             style="display: none;" 
             aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${character.name}</h5>
                        <button type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                class="btn-close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <img src="${character.thumbnail}"
                             style="max-width: 100%;"
                             alt="${character.name}"
                        >
                        <div>
                            <p class="text-muted">${character.modified}</p>
                            <h5>Описание:</h5>
                            <p>${character.description}</p>
                        </div>

                        <div class="modal-footer">
                            <button type="button"
                                    data-bs-dismiss="modal"
                                    class="btn btn-secondary  btn-sm"
                                    aria-label="Закрыть окно с информацией о ${character.name}"
                            >Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
}

const API_URL = 'https://akabab.github.io/superhero-api/api/all.json';
const MAX_CHARACTERS = 24;

/**
 * Получим информацию о персонажах с API
 */
async function fetchCharacters() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const heroes = await response.json();

    return MarvelUtils.mapHeroesToMarvelCharacters(heroes, MAX_CHARACTERS);
}

/**
 * Получить массив карточек персонажей
 *
 * @param characters
 * @returns {Array}
 */
function getCharacterCards(characters) {
    let characterCards = [];
    for (let i = 0; i < characters.length; i++) {
        let characterCard = getCharacterCard(characters[i]);
        characterCards.push(characterCard);
    }
    return characterCards;
}

/**
 * Получить массив модальных окон персонажей
 *
 * @param characters
 * @returns {Array}
 */
function getCharacterModals(characters) {
    let characterModals = [];
    for (let i = 0; i < characters.length; i++) {
        let characterCard = getCharacterModal(characters[i]);
        characterModals.push(characterCard);
    }
    return characterModals;
}
