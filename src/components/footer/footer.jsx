import {AppRoute} from "../../utils/consts.js";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

const Footer = (props) => {
  const {isMain = false} = props;

  return (
    <footer className="page-footer">
      <div className="logo">
        {
          !isMain ?
            <Link to={AppRoute.MAIN} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link> :
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
        }
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  isMain: PropTypes.bool,
};

export default Footer;
