import React, { useState } from 'react';
import "./Home.css";
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import MobileAppDownload from '../../components/MobileAppDownload/MobileAppDownload';

const Home = () => {

    const [category, setCategory] = useState('All');

    return (
        <div>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
            <MobileAppDownload />
        </div>
    )
}

export default Home;