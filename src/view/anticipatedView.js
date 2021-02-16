import {elements, imgUrl} from '../base';

const renderLatestGames = game => {
    const markup = `
    <li class="scale-in-center ">
        <div class="game-card">
            <div class="card__img">
                <div class="overlay__blurb">
                    <div class="content__blurb">
                        <h3>${game.name}</h3>
                        <div class="cta-btn">
                            <a href="#${game.id}" type="button">View game</a>
                        </div>
                    </div>
                </div>
                <img src="${imgUrl(game.cover.url)}" alt="${game.name}<">
            </div>
            <div class="card__title">
                <h3>${game.name}</h3>
            </div>
           </div>
     </li>
    `;
    // console.log(elements.latestGamesList);
    elements.latestGamesList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = (games) => {
    // console.log('Render games args');
    // console.log(games);
    games.forEach(renderLatestGames);
};

