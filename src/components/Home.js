import React from 'react';
import img from "../Images/pizzabackground.jpg";
import styled from "styled-components";

const ImageBackground = styled.div`
    /* vertical-align: top; */
    display: block;
    width: 100vw;
`

const Home = () => {
    return (
        <ImageBackground>
         <h1 style={{position: "fixed", color: "red", fontSize: '5rem', marginLeft: "20%", fontFamily: "Sansita Swashed"}}>Lamda Pizza</h1>
         <h4 style={{position: "fixed", color: "red", fontSize: '2rem', marginLeft: "55%", marginTop: "20%", fontFamily: "Sansita Swashed"}}>Pizza! Pizza! Pizza!</h4>
         <img src={img} alt="pizza" style={{postion: "", width: "100vw", height:"100vh"}}/>
        </ImageBackground>
    )
}

export default Home