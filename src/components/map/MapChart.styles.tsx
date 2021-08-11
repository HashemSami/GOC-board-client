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

export const DynamicChartContainer = styled.div<ChartContainerProps>`
  grid-column: col 1 / col 7;
  grid-row: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  .boundary {
    /* fill: #b3854a; */
    stroke: black;
    stroke-width: 1px;
  }
  .land {
    /* fill: #b3854a; */
    stroke: black;
    stroke-width: 1px;
  }
  ${setWidthAndHeight};
`;
