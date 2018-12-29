import React, { PropTypes } from 'react';
import style from './MainSection.css';

import RouteList from "./RouteList";

export default function MainSection({ validRoutes }) {
  return (
    <section className={style.main}>
      <RouteList routes={validRoutes} />
    </section>
  );
};

MainSection.propTypes = {
  validRoutes: PropTypes.array,
  inalidRoutes: PropTypes.array,
};
