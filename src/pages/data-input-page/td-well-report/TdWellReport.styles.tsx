import styled from "styled-components";

export const TdWellReportContainer = styled.div`
  /* grid-row: main-body; */
  grid-column: col 2 / col 13;
  /* min-height: 100%; */
  background-color: rgb(133, 135, 138);
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
  background-color: rgb(6, 70, 94);

  padding: 20px;
  display: grid;
  grid-template-columns: repeat(12, [col] 1fr);
  grid-auto-rows: minmax(100px, auto);
  justify-content: center;
  /* justify-items: stretch; */
  /* align-items: stretch; */
  /* align-content: stretch; */
  column-gap: 1vw;
  row-gap: 1vh;

  @media (min-width: 901px) {
    grid-column: col 1 / col 13;
  }
`;

export const WidthItem = styled.div`
  grid-column: 1 col / 13 col;
  width: calc(1vw * 90);
`;

export const FormContainer = styled.div`
  grid-column: 1 col / 13 col;
  color: white;
  /* background-color: teal; */
  padding: 10px;
  border: 2px solid white;
  button {
    background-image: linear-gradient(
      to bottom right,
      rgb(231, 74, 74),
      rgb(201, 70, 70),
      rgb(172, 48, 48)
    );
    padding: 10px 20px;
    font-size: 1em;
    color: white;
    border-radius: 8px;
    border: 1px solid white;
    :hover {
      background-image: linear-gradient(
        to bottom right,
        rgb(246, 250, 245),
        rgb(201, 70, 70),
        rgb(172, 48, 48)
      );
      cursor: pointer;
    }
  }
`;
