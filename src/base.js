import sprite from './img/like.svg';
import svgGraphic from './img/cover-no.svg';

export const likeSVG = sprite; 
export const noCoverSVG = svgGraphic;

export const elements = {
    latestGamesList: document.querySelector('.game--cards'),
    inputSearch: document.querySelector('.search__field'),
    search: document.querySelector('.search'),
    title: document.querySelector('.games-section__title'),
    pagination: document.querySelector('.pagination'),
    topPagination: document.querySelector('.top-pagination'),
    gameArea: document.querySelector('#game--area'),
    gamesSection: document.querySelector('.games-section'),
    formSection: document.querySelector('.form-section'),
    gameDetailsSection: document.querySelector('.game-details .inner-container'),
    favourite: document.querySelector('.like-holder'),
    likesPane: document.querySelector('.likes-pane'),
    likesList: document.querySelector('.liked-items')
}

// Class names (for elements that have not been loaded into the DOM)
export const elementStrings = {
    loader: 'loader',
    ctaContainer: 'cta-show',
    backButton: 'back-btn',
    likeButton: 'btn-like'
};

// Loader spinner for global use

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
                <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                <g fill="none" fill-rule="evenodd" stroke-width="2">
                    <circle cx="22" cy="22" r="1">
                        <animate attributeName="r"
                            begin="0s" dur="1.8s"
                            values="1; 20"
                            calcMode="spline"
                            keyTimes="0; 1"
                            keySplines="0.165, 0.84, 0.44, 1"
                            repeatCount="indefinite" />
                        <animate attributeName="stroke-opacity"
                            begin="0s" dur="1.8s"
                            values="1; 0"
                            calcMode="spline"
                            keyTimes="0; 1"
                            keySplines="0.3, 0.61, 0.355, 1"
                            repeatCount="indefinite" />
                    </circle>
                    <circle cx="22" cy="22" r="1">
                        <animate attributeName="r"
                            begin="-0.9s" dur="1.8s"
                            values="1; 20"
                            calcMode="spline"
                            keyTimes="0; 1"
                            keySplines="0.165, 0.84, 0.44, 1"
                            repeatCount="indefinite" />
                        <animate attributeName="stroke-opacity"
                            begin="-0.9s" dur="1.8s"
                            values="1; 0"
                            calcMode="spline"
                            keyTimes="0; 1"
                            keySplines="0.3, 0.61, 0.355, 1"
                            repeatCount="indefinite" />
                    </circle>
                </g>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    // targeting element which initially not loaded into the DOM
    const loaderEl = document.querySelector(`.${elementStrings.loader}`);
    loaderEl.parentElement.removeChild(loaderEl);
};

export const imgUrl = img => {
    // use split and join methods
    img = img.split('/');
    let index = img.indexOf('t_thumb');
    if (index !== -1) {
        img[index] = 't_720p';
    }
    img = img.join('/');
    // console.log(img);
    return img;
};

export const clearGames = () => {
    // console.log('This click event works');
    elements.title.textContent = '';
    elements.latestGamesList.innerHTML = '';

    // counter++;
};

export const showButton = ()=> {
    const markup = `
        <div class="cta-show">
            <div>    
            <button id="sag">Show Anticipated Games</button>
            <p>Or search for games using the search field above.</p>
            </div>
        </div>
    `;

    elements.latestGamesList.insertAdjacentHTML('beforeend', markup);

};

export const clearShowButton = ()=> {
    const cta = document.querySelector(`.${elementStrings.ctaContainer}`);
    cta.parentElement.removeChild(cta);
};

export const hoverAlternative = () => {

    const check = document.querySelector('.game-card');
    // console.log(check);
    if(check) {
        const mag = Array.from(document.querySelectorAll('.card__img'));
        mag.forEach(el => {
            el.addEventListener('click', e => {
                const el = e.target.parentElement;
                if (el.className === 'card__img') {
                    el.classList.add('selected');
                } else {
                    el.classList.remove('selected');
                }
            });
        });
}

}

