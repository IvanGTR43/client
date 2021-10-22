import React from 'react';
import { Helmet } from "react-helmet";
import MainBanner from "../components/Web/MainBanner";
import HomeProjects from '../components/Web/HomeProjects/HomeProjects';
import HowMyProjectsWork from '../components/Web/HowMyProjectsWork/HowMyProjectsWork';
import ReviewProjects from '../components/Web/ReviewProjects/ReviewProjects';
export default function Home() {
    return(
      <>
      <Helmet>
        <title>Ivan Gabriel Tacuapan Reyes</title>
        <meta name="description" content="Home | Web de Programacion" data-react-helmet="true"/>
      </Helmet>
				<MainBanner/>
				<HomeProjects /> 
				<HowMyProjectsWork/>
        {/* <ReviewProjects /> */}
      </>
    );
};
