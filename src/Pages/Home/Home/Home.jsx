import Review from "../../Review/Review";
import Banner from "./Banner/Banner";
import Gallery from "./Gallery/Gallery";
import PopularCollege from "./PopularCollages/PopularCollages";
import Research from "./Research/Research";

const Home = () => {
    return (
        <div>
            <Banner/>
            <PopularCollege/>
            <Gallery/>
            <Research/>
            <Review/>
        </div>
    );
};

export default Home;