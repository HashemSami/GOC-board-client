import styled from "styled-components";

export const HeaderNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0px 300px;
  background-color: brown;
`;

export const NavItemContainer = styled.div`
  border: 2px solid white;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  padding: 10px 15px;
  color: black;
  background-image: linear-gradient(
    to bottom right,
    rgb(165, 206, 94),
    rgb(166, 204, 99),
    rgb(119, 165, 39)
  );
`;
