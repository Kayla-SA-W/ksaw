import React from "react";
import { Container } from "../components/container";
import { SocialsContainer } from "../components/socials";
import { GlobalContainer } from "../components/global-container";
import styled from "styled-components";
import { Button } from "../components/button";

const Message = styled.p`
    color: #BFC0C0;
    font-size: 15px;
    margin: 20px;
`;


const Project = styled.div`
    border: 10px groove #BFC0C0;
    color: #BFC0C0;
    margin: 10px;
    font-size: 16px;
    padding: 10px 20px;
    width: 75%;
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    justify-self: center;
    a {
        color: #BFC0C0;
        margin-right: 10px;
    }
`;

const Title = styled.p`
    color: #BFC0C0;
    font-size: 20px;
`;

const Header = styled.h2`
    color: #BFC0C0;
    font-size: 30px;
    margin: 20px;
    justify-self: center;
    display: flex;
`;

const Freelance = () => (
    <GlobalContainer>
        <Container>
            <Header>Freelance Work</Header>
            <Project>
                <Title>Cherick's Eats Resturant</Title>
                <div>
                    <a href='https://www.cherickseats.com/' target='_blank'>Website</a>
                    <a href='https://github.com/Kayla-SA-W/chericks-eats' target='_blank'>Github Repo</a>
                </div>
            </Project>
            <Project>
                <Title>Forever Phillips Wedding</Title>
                <p>Password: kwilli</p>
                <div>
                    <a href='https://forever-phillips.com/' target='_blank'>Website</a>
                    <a href='https://github.com/Kayla-SA-W/brandon-katisha-wedding' target='_blank'>Github Repo</a>
                </div>
            </Project>
            <Project>
                <Title>Chosen Heart Counseling </Title>
                <div>
                    <a href='https://chosenheartcounseling.com/' target='_blank'>Website</a>
                    <a href='https://github.com/Kayla-SA-W/therapy-site' target='_blank'>Github Repo</a>
                </div>
            </Project>
            <Message>*All sites are active and belong to a business or person*</Message>
            <SocialsContainer />
            <Button to='/'> Home </Button>
        </Container>
    </GlobalContainer>
);

export default Freelance;