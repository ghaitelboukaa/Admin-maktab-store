import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Flexisel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            <div>
                <h3>Item 1</h3>
            </div>
            <div>
                <h3>Item 2</h3>
            </div>
            <div>
                <h3>Item 3</h3>
            </div>
            <div>
                <h3>Item 4</h3>
            </div>
            <div>
                <h3>Item 5</h3>
            </div>
        </Slider>
    );
};

export default Flexisel;
