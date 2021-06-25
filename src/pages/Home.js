import React from 'react';
import MainBanner from "../components/Web/MainBanner";
import HomeProjects from '../components/Web/HomeProjects/HomeProjects';
import HowMyProjectsWork from '../components/Web/HowMyProjectsWork/HowMyProjectsWork';
export default function Home() {
    return(
      <>
				<MainBanner/>
				<HomeProjects />
				<HowMyProjectsWork/>
      </>
    );
};
