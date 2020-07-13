import {ActionCreator} from "../../reducer/data/data.js";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import {Video} from "../../utils/consts.js";
import VideoPlayer from "../video-player/video-player.jsx";
import withVideo from "../../hocs/with-video/with-video.js";

const VideoPlayerWrapped = withVideo(VideoPlayer);

const FilmCard = (props) => {
  const {film, isPlaying, onClick, onMouseEnter, onMouseLeave} = props;
  const {preview, previewVideoLink, title} = film;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div
        className="small-movie-card__image"
        onClick={() => {
          onClick(film.id);
        }}
        onMouseEnter={() => {
          onMouseEnter();
        }}
        onMouseLeave={onMouseLeave}
      >
        <VideoPlayerWrapped
          isPlaying={isPlaying}
          width={Video.WIDTH}
          height={Video.HEIGHT}
          key={props.isPlaying}
          preview={preview}
          videoLink={previewVideoLink}
        />
      </div>
      <h3 className="small-movie-card__title"
        onClick={() => {
          onClick(film.id);
        }}>
        <a className="small-movie-card__link">{title}</a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
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
  }),
  isPlaying: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onClick(id) {
    dispatch(ActionCreator.changingId(id));
  },
});

export {FilmCard};
export default connect(null, mapDispatchToProps)(FilmCard);
