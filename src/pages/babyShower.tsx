import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Background from '../images/disney-background.jpg';
import BabyShowerImg from '../images/baby-shower.png';
import '@fontsource/montez';
import '@fontsource/dm-sans';

const GlobalStyle = createGlobalStyle`
body {
  background-image: url(${Background});
}
`;

const Container = styled.div`
    justify-self: center;
    background-color: white;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 50vw;
    border: 4px solid #70857A;
    align-items: center;
    padding-top: 40px;
`;

const Name = styled.h2`
font-family: 'Montez', sans-serif;
color: #70857A;
font-size: 30px;
text-align: center;
`;

const Paragraph = styled.p`
font-family: 'DM Sans', sans-serif;
justify-self: center;
height: fit-content;
margin: 0;
> a {
    color: #70857A;
}
`;

const BabyShower = () => {
    const [tempPassword, setPassword] = useState('');
    const password = sessionStorage.getItem("password");
    const checkPassword = () => {
        sessionStorage.setItem("password", tempPassword);
        location.reload();
    }
    
    return(
    <>
    { password === 'popcorn' ? (
        <div style={{display: 'grid'}}>
            <GlobalStyle/>
            <Container>
                <Paragraph>Please join us for a</Paragraph>
                <img src={BabyShowerImg} style={{height: '30%', width: '70%'}} />
                <Paragraph>honoring</Paragraph>
                <Name>Kayla Williams</Name>
                <Name>and</Name>
                <Name>Laurence Davis</Name>
                <Paragraph>October 14th 2023 | 5PM</Paragraph>
                <Paragraph>Location</Paragraph>
                <Paragraph style={{marginTop: 30}}>
                    <a href="https://forms.gle/wkzTGis8wHZgKtei6" target="_blank">RSVP</a> | {" "}
                    <a href="https://babylist.com/list/kpopcorn" target="_blank">Baby Registry</a>
                </Paragraph>
            </Container>
        </div>
    ) : (
        <div>
            <input type='text' placeholder="Please Enter Password" onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={checkPassword}>Enter</button>
        </div>
    ) }
    </>
  )}
  
  export default BabyShower