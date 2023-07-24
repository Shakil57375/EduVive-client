import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SectionTitle from '../../../../Components/SectionTitle/SectionTitle';

const Gallery = () => {

    const images = [
        'https://images.pexels.com/photos/1184580/pexels-photo-1184580.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/7944238/pexels-photo-7944238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/7944235/pexels-photo-7944235.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://img.freepik.com/premium-photo/portrait-group-students-celebrating-their-graduation_23-2148201817.jpg?w=740',
        'https://images.pexels.com/photos/7972735/pexels-photo-7972735.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://img.freepik.com/free-photo/group-students-celebrating-graduation-together-wearing-face-masks_1303-27693.jpg?w=740&t=st=1690052247~exp=1690052847~hmac=4b9523c20d24701b4001e98e4e9bfc6007c3fe0d4fbbea18898ff135d09609a4',
        'https://images.pexels.com/photos/8093042/pexels-photo-8093042.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/7713222/pexels-photo-7713222.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=600',
        "https://images.pexels.com/photos/8106683/pexels-photo-8106683.jpeg?auto=compress&cs=tinysrgb&w=600"
        // Add more image URLs as needed
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false, // Hide dots on small devices

                },
            },
        ],
    };

    const sliderRef = React.useRef(null);

    const handlePause = () => {
        sliderRef.current.slickPause();
    };

    const handlePlay = () => {
        sliderRef.current.slickPlay();
    };

    return (
        <div className='container padding-u-d padding-r-l'>

            <SectionTitle title={"Graduate Gallery"} subTitle={"Capturing the Moments of Triumph and Success: A Glorious Tribute to Our Graduates"}></SectionTitle>

            <Slider ref={sliderRef} {...settings} className="overflow-hidden">
                {images.map((image, index) => (
                    <div key={index} className="px-2">
                        <img src={image} alt={`Image ${index + 1}`} className="mx-auto rounded-lg h-64 w-screen" />
                    </div>
                ))}
            </Slider>

            <div className="flex justify-center gap-6 mt-4">
                <button
                    className="my-btn"
                    onClick={handlePause}
                >
                    Pause Slider
                </button>
                <button
                    className="my-btn"
                    onClick={handlePlay}
                >
                    Play Slider
                </button>
            </div>

        </div>
    );
};

export default Gallery;