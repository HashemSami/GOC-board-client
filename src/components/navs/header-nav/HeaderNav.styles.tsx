import styled from "styled-components";
import v from "../../../icons/rock4.jpg";

import { Link } from "react-router-dom";

export const HeaderNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0px 300px;
  background-image: linear-gradient(
    to bottom right,
    #868585,
    rgb(121, 116, 116),
    #868585
  );
  position: relative;
`;

export const NavItemContainer = styled(Link)`
  border: 2px solid white;
  text-decoration: none;
  border-radius: 8px 8px 0 0;
  padding: 10px 30px;
  color: white;
  background-color: #a50606;
`;
