import styled from "styled-components";

export const HomePageContainer = styled.div`
  grid-row: main-body;
  grid-column: col 1 / col 13;
  /* min-height: 100%; */
  background-color: skyblue;
  display: grid;
  grid-template-columns: repeat(12, [col] 1fr);
  grid-auto-rows: minmax(100px, auto);
  justify-content: center;
  justify-items: stretch;
  align-items: stretch;
  /* align-content: stretch; */
  column-gap: 2vw;
  row-gap: 2vh;
`;

export const Item = styled.div`
  grid-column: col 1 / col 13;
  /* grid-row: header; */
  background-color: #2d9a4c;

  @media (min-width: 901px) {
    grid-column: col 3 / col 11;
  }
`;
