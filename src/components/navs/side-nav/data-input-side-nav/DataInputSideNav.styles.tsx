import styled from "styled-components";

import { Link } from "react-router-dom";

export const DataInputNavContainer = styled.div`
  /* grid-column: col 1 / col 3; */
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  align-items: stretch;
  padding: 50px 10px;
  overflow-y: auto;
  /* padding: 0px 300px; */
  background-color: teal;
  /* fixed  */
  width: 8em;
  position: fixed;
  height: 100vh;
`;

export const NavItemContainer = styled(Link)`
  border: 2px solid white;
  /* border-bottom: none; */
  text-decoration: none;
  border-radius: 8px 8px 0 0;
  padding: 10px 15px;
  margin: 20px 0px;
  color: white;
  width: 80%;
  background-image: linear-gradient(
    to bottom right,
    rgb(231, 74, 74),
    rgb(201, 70, 70),
    rgb(172, 48, 48)
  );
`;
