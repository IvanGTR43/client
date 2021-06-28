import React from 'react';
import MainBanner from "../components/Web/MainBanner";
import HomeProjects from '../components/Web/HomeProjects/HomeProjects';
import HowMyProjectsWork from '../components/Web/HowMyProjectsWork/HowMyProjectsWork';
import ReviewProjects from '../components/Web/ReviewProjects/ReviewProjects';
export default function Home() {
    return(
      <>
				<MainBanner/>
				<HomeProjects />
				<HowMyProjectsWork/>
        <ReviewProjects />
      </>
    );
};
