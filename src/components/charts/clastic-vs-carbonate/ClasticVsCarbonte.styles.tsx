import styled, { css } from "styled-components";

interface ChartContainerProps {
  width: number;
  height: number;
}

const setWidthAndHeight = (props: ChartContainerProps) => {
  return css`
    width: ${props.width};
    height: ${props.height};
  `;
};

export const ChartContainer = styled.div<ChartContainerProps>`
  grid-column: col 7 / col 13;
  grid-row: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-right: 20px; */

  ${setWidthAndHeight}
  svg {
    border: 2px solid white;
    background-color: teal;
    .axis-bar {
      line {
        stroke: white;
      }
      path {
        stroke: white;
      }
      text {
        fill: white;
      }
    }
  }
`;
