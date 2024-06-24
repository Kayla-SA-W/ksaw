import React from "react";
import styled from "styled-components";
import LinkedIn from '../images/linkedIn.svg';
import Github from '../images/github.svg';
import Storygraph from '../images/storygraph.svg';

const Socials = styled.div`
    justify-self: center;
    display:flex;
    gap: 30px;
    margin-bottom: 20px;
`;

const Img = styled.img`
    width: 30px;
`;

const StoryGraphWrapper = styled.div`
    width: 30px;
    height: 30px;
    background-color: #BFC0C0;
    border-radius: 15%;
    padding: 1px;
`;

export const SocialsContainer = () => (
    <Socials>
        <a href='https://www.linkedin.com/in/kayla-sa-w/' target='_blank'><Img src={LinkedIn} /></a>
        <a href='https://github.com/Kayla-SA-W' target='_blank'><Img src={Github} /></a>
        <StoryGraphWrapper>
            <a href='https://app.thestorygraph.com/profile/blkunicorn' target="_blank"><Img src={Storygraph} /></a>
        </StoryGraphWrapper>
        </Socials>
);