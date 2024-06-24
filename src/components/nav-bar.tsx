import React, { useState } from 'react';
import styled from 'styled-components';
import GreenCode from '../images/closing-tag-green.svg';
import { Link } from 'gatsby';

const NavContainer = styled.div`
    width: 100vw;
    height: 160px;
    margin-left: -8px;
    display: flex;
    font-size: 20px;
`

const TagButton = styled.button`
border: none;
width: fit-content;
height: fit-content;
background-color: transparent;
> img {
    height: 30px;
}
`

const Button = styled(Link)`
    background-color: #003B36;
    border: none;
    border-radius: 5px;
    padding: 5px;
    color: #BFC0C0;
    font-size: 20px;
    margin: 0 10px;
    width: 25%;
    height: 50px;
    display: flex;
    justify-self: center;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    text-align: center;
`;

export const Nav = () => {
    const [open, setOpen] = useState(false);
    return (
        <NavContainer>
            {open ? (
                <>
                <TagButton onClick={() => setOpen(false)} style={{ justifySelf: 'end' }}>
                    <img src={GreenCode} />
                </TagButton>
                    <Button to='/bootcamp'>Bootcamp Projects</Button>
                    <Button to='/freelance'>Freelance Projects</Button>
                </>
            ) : (
                <TagButton onClick={() => setOpen(true)}>
                    <img src={GreenCode} />
                </TagButton>
            )}
        </NavContainer>
    )
};