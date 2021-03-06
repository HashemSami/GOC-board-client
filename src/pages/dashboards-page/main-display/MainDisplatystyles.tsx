import styled, { css } from "styled-components";

export const MainDisplayContainer = styled.div`
  /* grid-row: main-body; */
  grid-column: col 2 / col 10;
  /* min-height: 100%; */
  background-color: rgb(133, 135, 138);
  display: grid;
  grid-template-columns: repeat(12, [col] auto);
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
  /* justify-items: stretch;
  align-items: stretch;
  align-content: stretch; */
  column-gap: 1vw;
  row-gap: 1vh;

  @media (min-width: 901px) {
    grid-column: col 1 / col 13;
  }
`;

interface WidthItemProps {
  setWidth: number;
}

const setWidth = (width: WidthItemProps) => {
  return css`
    width: ${width.setWidth};
  `;
};

export const WidthItem = styled.div<WidthItemProps>`
  grid-column: 1 col / 13 col;
  width: calc(1vw * 85);
`;
