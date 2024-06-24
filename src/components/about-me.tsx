import React from 'react';
import HeadShot from '../images/headshot.jpg';
import styled from 'styled-components';
import resume from '../../static/kaylawilliams_resume.pdf';
import { Container } from './container';
import { SocialsContainer } from './socials';
import { Button } from './button';

const Image = styled.img`
    justify-self: center;
    border-radius: 50%;
    max-height: 300px;
    margin-top: 30px;
`;

const Heading = styled.h1`
    margin: 20px;
    color: #BFC0C0;
    font-size: 30px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const Resume = styled.a`
    background-color: #BFC0C0;
    border: none;
    border-radius: 5px;
    padding: 5px;
    color: #003B36;
    font-size: 20px;
    margin: 12px 0 25px;
    width: 25%;
    display: flex;
    justify-self: center;
    justify-content: center;
    text-decoration: none;
`;

export const AboutMe = () => (
    <Container>
        <Image src={HeadShot}/>
        <Heading>
            Full-Stack Engineer | Bibliofile 
        </Heading>
        <SocialsContainer />
        <ButtonsContainer>
            <Button to='/freelance'> Freelance Work</Button>
            <Resume href={resume} target='_blank'> Resume </Resume>
        </ButtonsContainer>
    </Container>
);
