import {elements, elementStrings, imgUrl, likeSVG, noCoverSVG} from '../base';

export const clearUI = ()=> {

    [elements.gamesSection, elements.formSection].forEach( el => el.classList.add('hide'));
    elements.gameArea.innerHTML = '';
    renderArea();
}
export const renderArea = () => {
    elements.gameDetailsSection.classList.add('show');
    
};
export const renderGame = (game, isLiked) => {
    // console.log(isLiked);

    // When working on local version use the following for likes svg
    // <use xlink:href="${isLiked ? likeSVG + '#heart-shape-silhouette': likeSVG + '#heart'}"></use> 
    // <use xlink:href="${isLiked ? 'https://mohammedr.dev/games-library-app/assets/like.svg#heart-shape-silhouette': 'https://mohammedr.dev/games-library-app/assets/like.svg#heart'}"></use>


    const markup = `
    <div class="gd--card">
    <div class="grp-col-two">
        <div class="text-content">
            <div class="blurb">
                <h1>${game.title}</h1>
                <p>${game.summary}</p>
            </div>
            <div class="company-container">
                <div class="company-logo">
                    <a href="${game.website === undefined ? '#' : game.website }" target="_blank"><img src="${(game.logo=== undefined ) || (!game.logo) ? game.company : '//images.igdb.com/igdb/image/upload/t_logo_med/' + game.logo + '.png'}" alt="${game.company}"></a>
                    
                </div>
                <div class="grp-ctas">
                    <button class="back-btn">Back</button>
                    <button class="btn-like">
                    <svg class="icon" width="40px" height="40px">
                    <use xlink:href="${isLiked ? 'https://mohammedr.dev/games-library-app/assets/like.svg#heart-shape-silhouette': 'https://mohammedr.dev/games-library-app/assets/like.svg#heart'}"></use>
                        </svg>                    
                    </button>
                    </div>
                </div>
            </div>
            <div class="img-content">
                <img src="${(game.cover === undefined ) || (!game.cover) ? noCoverSVG :imgUrl(game.cover)}" alt="${game.title}">
            </div>
        </div>
    
    </div>
    `;
    elements.gameArea.insertAdjacentHTML('beforeend', markup);
};

export const backBtn = (e) => {
    document.querySelector(`.${elementStrings.backButton}`).addEventListener('click', (e) => {
        // console.log(e.target);
        if (e.target.className === 'back-btn') {
            // console.log('back button has been clicked');
            if (elements.title.id === 'results') {
                // console.log('results is the id');
                [elements.gamesSection, elements.formSection].forEach( el => el.classList.remove('hide'));
                elements.gameArea.innerHTML = '';
                history.replaceState({}, document.title, ".");
                renderArea();
            } else {
                // Home page version - search version will be different
            // reload page and remove hash
            history.replaceState({}, document.title, ".");
            location.reload();
            renderArea();
            }
            
            elements.gameDetailsSection.classList.remove('show');
        }
        
    })
};