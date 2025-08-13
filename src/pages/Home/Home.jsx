import React from 'react';
import Banner from './Banner';
import FeaturedFoods from './FeaturedFoods';
// import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials ';
import WhyJoinUs from './Newsletter';

const Home = () => {
    return (
        <div>
            {/* banner */}
            <div>
                <Banner></Banner>
            </div>
            {/* Featured Foods card */}
            <div>
                <FeaturedFoods></FeaturedFoods>
            </div>

            {/* <div>
                <HowItWorks></HowItWorks>
            </div> */}

            <div>
                <Testimonials></Testimonials>
            </div>

            <div>
                <WhyJoinUs></WhyJoinUs>
            </div>
        </div>
    );
};

export default Home;