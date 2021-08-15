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
  grid-column: col 1 / col 13;
  grid-row: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;

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
    .bit-icon {
      animation: hideshow 2s ease infinite;
    }
    @keyframes hideshow {
      0% {
        stroke: orange;
      }
      10% {
        stroke: #333333;
      }
      50% {
        stroke: #313131;
      }
      100% {
        stroke: #292828;
      }
    }
  }
`;
