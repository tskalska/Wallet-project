import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "../../css/main.min.css";

function ButtonLink({ bottomTitle, link }) {
  return (
    <Link to={link} className="btnLinkForm">
      {bottomTitle}
    </Link>
  );
}

ButtonLink.propTypes = {
  bottomTitle: PropTypes.string,
  link: PropTypes.string,
};

export default ButtonLink;
