import {Genre, SHOWING_FILMS_COUNT_ON_START} from "../../utils/consts.js";
import {createFilm, createFilms} from "../../adapters/films.js";

const initialState = {
  allFilms: [],
  genre: Genre.ALL,
  id: -1,
  promoFilm: {},
  showedFilmsCount: SHOWING_FILMS_COUNT_ON_START,
  isPlayerOpened: false,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_FILM_ID: `CHANGE_FILM_ID`,
  INCREMENT_SHOWED_FILMS_COUNT: `INCREMENT_SHOWED_FILMS_COUNT`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  OPEN_PLAYER: `OPEN_PLAYER`,
};

const ActionCreator = {
  changingGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  changingId: (id) => ({
    type: ActionType.CHANGE_FILM_ID,
    payload: id,
  }),
  incrementOfFilmsCount: (count) => ({
    type: ActionType.INCREMENT_SHOWED_FILMS_COUNT,
    payload: count,
  }),
  loadingOfMovies: (films) => ({
    type: ActionType.LOAD_MOVIES,
    payload: createFilms(films),
  }),
  loadingOfPromoFilm: (film) => ({
    type: ActionType.LOAD_PROMO_FILM,
    payload: createFilm(film),
  }),
  openingOfPlayer: (value) => ({
    type: ActionType.OPEN_PLAYER,
    payload: value,
  }),
};

const Operation = {
  loadingOfPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadingOfPromoFilm(response.data));
      });
  },
  loadingOfMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
    .then((response) => {
      dispatch(ActionCreator.loadingOfMovies(response.data));
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return Object.assign({}, state, {
        genre: action.payload,
        showedFilmsCount: SHOWING_FILMS_COUNT_ON_START,
      });
    case ActionType.CHANGE_FILM_ID:
      return Object.assign({}, state, {id: action.payload});
    case ActionType.INCREMENT_SHOWED_FILMS_COUNT:
      return Object.assign({}, state, {showedFilmsCount: state.showedFilmsCount + action.payload});
    case ActionType.LOAD_MOVIES:
      return Object.assign({}, state, {allFilms: action.payload});
    case ActionType.LOAD_PROMO_FILM:
      return Object.assign({}, state, {promoFilm: action.payload});
    case ActionType.OPEN_PLAYER:
      return Object.assign({}, state, {isPlayerOpened: action.payload});
    default:
      return state;
  }
};

export {ActionCreator, ActionType, Operation, reducer};
