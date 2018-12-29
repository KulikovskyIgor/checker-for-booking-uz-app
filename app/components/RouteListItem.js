import React, { PropTypes } from "react";

import style from "./RouteListItem.css";

export default function RouteListItem({ from, to, trains, tickets }) {
    return (
        <div className={style.container}>
            <span className={style.offset}>{from}</span>
            <span className={style.offset}>{to}</span>
            <div>
            <span className={style.offset}>Trains {trains}</span>
                {tickets.map((ticket, index) => (
                    <span key={index}>
                        <span className={style.offset}>{ticket.type}</span>
                        <span className={style.offset}>{ticket.places}</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

RouteListItem.propTypes = {
    from: PropTypes.string,
    to: PropTypes.string,
    trains: PropTypes.number,
    tickets: PropTypes.array,
};

RouteListItem.defaultProps = {
    tickets: [],
};
