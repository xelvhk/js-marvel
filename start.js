async function start() {
    let characterCardBox = document.querySelector('#character-card-box');
    let characterModalBox = document.querySelector('#character-modal-box');

    try {
        let characters = await fetchCharacters();

        if (!characters.length) {
            characterCardBox.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Не удалось получить персонажей Marvel. Попробуйте обновить страницу позже.
                </div>
            `;
            characterModalBox.innerHTML = '';
            return;
        }

        characterCardBox.innerHTML = getCharacterCards(characters).join('');
        characterModalBox.innerHTML = getCharacterModals(characters).join('');
    } catch (error) {
        characterCardBox.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Ошибка загрузки данных: ${error.message}
            </div>
        `;
        characterModalBox.innerHTML = '';
    }
}
