import React from "react";
import { GlobalContainer } from "../components/global-container";
import { Button } from "../components/button";
import styled from "styled-components";

const NotFoundcopy = styled.p`
padding: 5px;
    color: #003B36;
    font-size: 20px;
`;

const NotFound = () => (
  <GlobalContainer>
    <div>
    <NotFoundcopy>
      The Page your looking for does not exist.
      Please return home.
    </NotFoundcopy>
    <Button to="/">Home</Button>
    </div>
  </GlobalContainer>
);

export default NotFound;