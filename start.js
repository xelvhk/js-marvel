const PAGE_SIZE = 9;

function renderPaginationControls(container, page, totalPages, onPageChange) {
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = `
        <div class="d-flex align-items-center justify-content-between mt-3 mb-2">
            <button class="btn btn-outline-secondary btn-sm" id="pagination-prev" aria-label="Предыдущая страница" ${
                page <= 1 ? 'disabled' : ''
            }>Назад</button>
            <span class="text-muted" aria-live="polite">Страница ${page} из ${totalPages}</span>
            <button class="btn btn-outline-secondary btn-sm" id="pagination-next" aria-label="Следующая страница" ${
                page >= totalPages ? 'disabled' : ''
            }>Вперед</button>
        </div>
    `;

    const prevButton = document.querySelector('#pagination-prev');
    const nextButton = document.querySelector('#pagination-next');

    if (prevButton) {
        prevButton.addEventListener('click', () => onPageChange(page - 1));
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => onPageChange(page + 1));
    }
}

async function start() {
    let characterCardBox = document.querySelector('#character-card-box');
    let characterModalBox = document.querySelector('#character-modal-box');
    let searchInput = document.querySelector('#character-search');
    let paginationBox = document.querySelector('#pagination-box');

    try {
        let characters = await fetchCharacters();
        let state = {
            all: characters,
            filtered: characters,
            page: 1,
        };

        const render = () => {
            const { items, page, totalPages } = MarvelUtils.paginateCharacters(
                state.filtered,
                state.page,
                PAGE_SIZE
            );
            state.page = page;

            if (!state.filtered.length) {
                characterCardBox.innerHTML = `
                    <div class="alert alert-warning" role="alert">
                        По вашему запросу персонажи не найдены.
                    </div>
                `;
                characterModalBox.innerHTML = '';
                paginationBox.innerHTML = '';
                return;
            }

            characterCardBox.innerHTML = getCharacterCards(items).join('');
            characterModalBox.innerHTML = getCharacterModals(items).join('');
            renderPaginationControls(paginationBox, page, totalPages, (nextPage) => {
                state.page = nextPage;
                render();
            });
        };

        if (!characters.length) {
            characterCardBox.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Не удалось получить персонажей Marvel. Попробуйте обновить страницу позже.
                </div>
            `;
            characterModalBox.innerHTML = '';
            if (paginationBox) {
                paginationBox.innerHTML = '';
            }
            return;
        }

        if (searchInput) {
            searchInput.addEventListener('input', (event) => {
                state.filtered = MarvelUtils.filterCharactersByName(
                    state.all,
                    event.target.value
                );
                state.page = 1;
                render();
            });
        }

        render();
    } catch (error) {
        characterCardBox.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Ошибка загрузки данных: ${error.message}
            </div>
        `;
        characterModalBox.innerHTML = '';
        if (paginationBox) {
            paginationBox.innerHTML = '';
        }
    }
}
