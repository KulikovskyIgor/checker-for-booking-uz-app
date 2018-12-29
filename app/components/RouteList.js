import React, { PropTypes } from "react";

import RouteListItem from "./RouteListItem";
import style from "./RouteList.css";

export default function RouteList ({routes}) {
    return (
        <div className={style.container}>
            { routes.map((route, index) => <RouteListItem key={index} {...route} />) }
        </div>
    );
}

RouteList.propTypes = {
    routes: PropTypes.array,
};

RouteList.defaultProps = {
    routes: [],
};