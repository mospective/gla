import {elements, elementStrings, likeSVG, imgUrl, noCoverSVG} from '../base';

export const toggleLikeBtn = isLiked => {
    // console.log(isLiked);
    const iconString = isLiked ? 'heart-shape-silhouette' : 'heart';
    document.querySelector('.btn-like svg use').setAttribute('xlink:href', `https://mohammedr.dev/games-library-app/assets/like.svg#${iconString}`);
    // for local version
    // document.querySelector('.btn-like svg use').setAttribute('xlink:href', `${likeSVG + '#' + iconString}`);
};

export const toggleLikesPane = numLikes => {
    if (numLikes > 0) {
        elements.favourite.classList.add('have-likes');
        elements.likesPane.style.display = 'block';
    } else if ( numLikes < 1) {
        elements.favourite.classList.remove('have-likes');
        elements.likesPane.style.display = 'none';
    }
}

export const renderLike = like => {
    const markup = `
    <li>
        <a class="like-link" href="#${like.id}">
            <button>
                <div class="liked-item__cover">
                    <img src="${(like.img === undefined ) || (!like.img) ? noCoverSVG : imgUrl(like.img) }" alt="${like.title}">
                </div>
                <div class="liked-item__title">
                    <h5>${like.title}</h5>
                </div>
            </button>
        </a>
    </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
    const el = document.querySelector(`.like-link[href*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
}

