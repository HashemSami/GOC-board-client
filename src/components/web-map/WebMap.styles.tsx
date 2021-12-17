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
  grid-column: col 1 / col 13;
  grid-row: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  ${setWidthAndHeight};
  height: 400px;
`;

export const WebMapConTainer = styled.div`
  height: 400px;
`;
