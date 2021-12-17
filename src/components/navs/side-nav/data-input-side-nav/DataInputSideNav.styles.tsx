import styled from "styled-components";

import { Link } from "react-router-dom";

export const NavItemContainer = styled(Link)`
  border: 2px solid white;
  /* border-bottom: none; */
  text-decoration: none;
  border-radius: 8px 8px 0 0;
  padding: 10px 15px;
  margin: 20px 0px;
  color: white;
  width: 80%;
  height: 2em;
  background-image: linear-gradient(
    to bottom right,
    rgb(231, 74, 74),
    rgb(201, 70, 70),
    rgb(172, 48, 48)
  );
`;
