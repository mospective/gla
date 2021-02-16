import './main.scss';

import Anticipated from './model/Anticipated';
import Search from './model/Search';
import Game from './model/Game';
import * as anticipatedView from './view/anticipatedView';
import * as gameView from './view/gameView';
import * as searchView from './view/searchView';
import {elements, renderLoader, clearLoader, showButton, clearShowButton, elementStrings, clearGames, hoverAlternative} from './base';
import Likes from './model/Likes';
import * as likesView from './view/likesView';


const state = {};


// LOAD ANTICIPATED GAMES

const controlAnticipated = async (status) => {
    state.latest = new Anticipated();

    // Prepare UI

    if (status === false) {
        return;
    } else {
    renderLoader(elements.latestGamesList);

        try {
            await state.latest.getGames();
            // console.log('Testing out results');
            // console.log(state.latest.result);
    
            // render UI
            clearLoader();
            anticipatedView.renderResults(state.latest.result);
            hoverAlternative();
        } catch (error) {
            console.log('Someting went wrong with Anticipated');
            console.log(error);
        }
    } 
   
}

controlAnticipated();







const searchController = async () => {
    const query = searchView.getInput();
    // console.log(query);

    if (query) {
        state.search = new Search(query);
        // clear DOM
        clearGames();
        renderLoader(elements.latestGamesList);
       
        // wait for data
        
        try {
            await state.search.searchGames();
            clearLoader();
            // console.log(state.search.searchResult);
            if (!state.search.searchResult.length < 1 || !state.search.searchResult === undefined) {
                searchView.renderSearchResults(state.search.searchResult);
                hoverAlternative();
            } else {
                searchView.renderError();
                console.log('Search results not found');
            }
                        
        }
        catch(error) {
            console.log('There was an error with search');
            console.log(error);
        }
       
    }
};

// Pagination Control
elements.topPagination.addEventListener('click', e => {
    const btn = e.target.closest('.top-pagination__btn');
    // console.log(btn);
    if (btn) {
        // reading the data attribute
        const goToPage = parseInt(btn.dataset.goto, 10);
        clearGames();
        elements.title.innerHTML = `<span>Result: </span> ${state.search.query} (${state.search.searchResult.length})`;
        searchView.clearResults();
        searchView.renderSearchResults(state.search.searchResult, goToPage);
        // console.log(goToPage);
    }
});


// if clicked inside the input field clear all games
// else load anticipated games
// Refactor this code later

elements.search.addEventListener('click', e => {

    clearGames();
    searchView.clearResults();
    showButton();
    controlAnticipated(false);

    const ctaBtn = document.querySelector(`.${elementStrings.ctaContainer}`);
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            clearGames();
            elements.title.id = 'most';
            elements.title.innerHTML = `<span>Most</span> anticipated games`;
            controlAnticipated();
        });
    }

});
elements.search.addEventListener('submit', e => {
    e.preventDefault();
    searchController();
    elements.title.id = 'results';
    elements.title.innerHTML = `<span>Result: </span> ${state.search.query}`;
    elements.inputSearch.value = '';
});




// Game details

const gameController =  async () => {

    const id = window.location.hash.replace('#','');
    // console.log(id);

    if (id) {

        // prepare the UI
        gameView.clearUI();
        renderLoader(elements.gameArea);

        // State the class
        state.game = new Game(id);

        try  {
        // Call API
        await state.game.getGame();

        // Update the UI
        clearLoader();
        gameView.renderGame(
            state.game,
            state.likes.isLiked(id)
            );

        }
        catch (error) {
        // Error msg
        console.log('Something went wrong');
        console.log(error);
        }

       
    }
    // Likes handler
    document.querySelector(`.${elementStrings.likeButton}`).addEventListener('click', likesController);
     // Back button
     gameView.backBtn();
};

window.addEventListener('hashchange', gameController);






// Show what's in the state in the console type in r
window.r = state;

// Likes Testing case
// state.likes = new Likes()


// Likes controller

const likesController = () => {

    if (!state.likes) state.likes = new Likes();
    const currentID = state.game.id;
    // user hasn't liked a game yet
    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.game.title,
            state.game.cover
        )
        //  Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        // console.log(state.likes);
        likesView.renderLike(newLike);

        // Game has been liked
    } else {
        // remove like to the state
        state.likes.deleteLike(currentID);

        //  Toggle the like button
        likesView.toggleLikeBtn(false);

        // remove like to UI list
        // console.log(state.likes);
        likesView.deleteLike(currentID);
    }

    likesView.toggleLikesPane(state.likes.getNumLikes());


};

// Restore liked games on page load
window.addEventListener('load', () => {
    state.likes = new Likes();
    // restore likes
    state.likes.readStorage();
    // toggle like button on
    likesView.toggleLikesPane(state.likes.getNumLikes());
    // render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));

});

// Other controls
// Liked pane activation
const favourite = document.querySelector('.like-holder');
const likesPane = document.querySelector('.likes-pane');

favourite.addEventListener('click', e => {
    if (e.target.matches('.like-holder, .like-holder *')) {
        // console.log('the button has been selected');
        likesPane.classList.toggle('active');
        document.body.classList.toggle('active');
    }
});

const closePane = () => {
    elements.likesList.addEventListener('click', e => {
        // console.log(e.target);

        if (e.target.matches('.liked-items li a *')) {
            elements.likesPane.classList.remove('active');
            document.body.classList.remove('active');
        }
    })
};

closePane();

window.addEventListener('load',() => {
    history.replaceState({}, document.title, ".");
});