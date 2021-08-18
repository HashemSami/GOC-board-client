import styled from "styled-components";
import v from "../../icons/rock4.jpg";

export const HeaderContainer = styled.div`
  grid-column: col 1 / col 13;
  /* grid-row: header; */
  background-color: gray;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: fixed;
  width: inherit;
  height: 120px;

  background-image: url(${v});

  /* background-image: linear-gradient(
    to bottom right,
    rgb(184, 155, 56),
    rgb(208, 219, 188),
    rgb(184, 155, 56)
  ); */
`;

export const HeaderTitle = styled.div`
  padding: 10px;
  font-size: 1.5em;
  /* color: brown; */
  font-family: system-ui;
  /* border: 4px solid brown; */
  div {
    color: ghostwhite;
    background-color: rgba(0, 128, 128, 0.9);
    padding: 5px;
    font-weight: 600;
  }
`;
