import {createSelector} from "reselect";
import {getFilmsByFilter} from "../../utils/common.js"
import NameSpace from "../name-space.js";

const getAllFilms = (state) => state[NameSpace.DATA].allFilms;

const getGenre = (state) => state[NameSpace.DATA].genre;

const getId = (state) => state[NameSpace.DATA].id;

const getPromofilm = (state) => state[NameSpace.DATA].promoFilm;

const getShowedFilmsCount = (state) => state[NameSpace.DATA].getShowedFilmsCount;

const getFilmById = createSelector(
  getAllFilms,
  getId,
  (allFilms, id) => allFilms.find((film) => film.id === id)
);

const getFilmsListByGenre = createSelector(
  getAllFilms,
  getGenre,
  (allFilms, genre) => getFilmsByFilter(allFilms, genre),
);

export {getFilmById, getFilmsListByGenre, getGenre, getId, getPromofilm};
