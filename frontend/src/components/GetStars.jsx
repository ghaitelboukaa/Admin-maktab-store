import React from 'react'

export default function GetStars({ rating }) {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<i key={i} className="fa fa-star" aria-hidden="true"></i>);
        } else if (rating >= i - 0.5) {
            stars.push(<i key={i} className="fa fa-star-half-o" aria-hidden="true"></i>);
        } else {
            stars.push(<i key={i} className="fa fa-star-o" aria-hidden="true"></i>);
        }
    }
    return stars;
}
