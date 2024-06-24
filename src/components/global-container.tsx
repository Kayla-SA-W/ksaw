import styled, { createGlobalStyle } from "styled-components";
import Background from "../images/background.jpg";
import React from "react";

const GlobalStyle = createGlobalStyle`
  body {
      background-image: url(${Background});
    margin: 0;
    font-family: "Dancing Script";
  }
`;

const Container = styled.div`
  display: grid;
  height: 100vh;
`;

export const GlobalContainer = ({ children }: React.PropsWithChildren<{}>) => (
  <>
  <GlobalStyle />
    <Container>
      {children}
    </Container>
  </>
)
