import styled from "styled-components";

export const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  display: grid;
  min-height: 100%;
  grid-template-columns: repeat(12, [col] 1fr);
  grid-template-rows: [header] auto [main-body] 1fr [footer] auto;
  justify-content: center;
  justify-items: stretch;
  align-items: stretch;
  column-gap: 2vw;
  row-gap: 2vh;
`;
