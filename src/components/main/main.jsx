import {AppRoute} from "../../utils/consts.js";
import {connect} from "react-redux";
import Error from "../error/error.jsx";
import FilmsList from "../films-list/films-list.jsx";
import Footer from "../footer/footer.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import {getError} from "../../reducer/errors/selectors.js";
import Header from "../header/header.jsx";
import {getFilmsListByGenre, getShowedFilmsCount, getPromoFilm} from "../../reducer/data/selectors.js";
import {Link} from "react-router-dom";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import PropTypes from "prop-types";
import React from "react";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";

const GenresListWrapped = withActiveItem(GenresList);

const Main = (props) => {
  const {
    errorText,
    filmsCount,
    filmsList,
    promoFilm,
    onAddToMyListClick,
  } = props;

  const {
    backgroundImage,
    genre,
    id,
    image,
    isFavourite,
    title,
    year
  } = promoFilm;

  return (
    <div>
      {
        errorText &&
        <Error
          message={errorText}
        />
      }
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header
          className={`movie-card__head`}
          isLinkToMyList={true}
          isMain={true}
          isUserBlock={true}
        />

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={image} alt={title} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
              </p>

              <div className="movie-card__buttons">
                <Link
                  to={`${AppRoute.PLAYER}/${id}`}
                  className="btn btn--play movie-card__button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <button className="btn btn--list movie-card__button" type="button" onClick={() => {
                  onAddToMyListClick(id, isFavourite);
                }}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    {isFavourite ? <use xlinkHref="#in-list"></use> : <use xlinkHref="#add"></use>}
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresListWrapped/>

          <FilmsList
            films={filmsList}
          />

          <div className="catalog__more">
            {filmsList.length >= filmsCount && <ShowMoreButton/>}
          </div>
        </section>

        <Footer
          isMain={true}
        />
      </div>
    </div>
  );
};

Main.propTypes = {
  avatarImage: PropTypes.string,
  errorText: PropTypes.string,
  filmsCount: PropTypes.number.isRequired,
  filmsList: PropTypes.arrayOf(
      PropTypes.shape({
        backgroundColor: PropTypes.string.isRequired,
        backgroundImage: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        isFavourite: PropTypes.bool.isRequired,
        image: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired,
        previewVideoLink: PropTypes.string.isRequired,
        ratingCount: PropTypes.number.isRequired,
        ratingScore: PropTypes.number.isRequired,
        runTime: PropTypes.number.isRequired,
        starring: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string.isRequired,
        videoLink: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
      })).isRequired,
  promoFilm: PropTypes.shape({
    backgroundImage: PropTypes.string,
    genre: PropTypes.string,
    id: PropTypes.number,
    isFavourite: PropTypes.bool,
    image: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
  }).isRequired,
  onAddToMyListClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errorText: getError(state),
  filmsCount: getShowedFilmsCount(state),
  filmsList: getFilmsListByGenre(state).slice(0, getShowedFilmsCount(state)),
  promoFilm: getPromoFilm(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAddToMyListClick(id, isFavourite) {
    dispatch(DataOperation.addFilmToFavourites(id, isFavourite));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
