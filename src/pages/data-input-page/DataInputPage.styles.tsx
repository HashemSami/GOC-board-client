import styled from "styled-components";

export const DataInputPageContainer = styled.div`
  /* grid-row: main-body; */
  grid-column: col 1 / col 13;
  /* min-height: 100%; */
  background-color: rgb(133, 135, 138);
  display: grid;
  grid-template-columns: 9em repeat(7, [col] 1fr);
  grid-auto-rows: minmax(100px, auto);
  justify-content: center;
  justify-items: stretch;
  align-items: stretch;
  /* align-content: stretch; */
  column-gap: 2vw;
  row-gap: 2vh;
`;

// export const Item = styled.div`
//   grid-column: col 1 / col 13;
//   /* grid-row: header; */
//   background-color: #005457;

//   padding: 20px;
//   display: grid;
//   grid-template-columns: repeat(12, [col] 1fr);
//   grid-auto-rows: minmax(100px, auto);
//   justify-content: center;
//   /* justify-items: stretch; */
//   /* align-items: stretch; */
//   /* align-content: stretch; */
//   column-gap: 1vw;
//   row-gap: 1vh;

//   @media (min-width: 901px) {
//     grid-column: col 1 / col 14;
//   }
// `;

export const SideNavDiv = styled.div`
  /* grid-column: col 1 / col 2; */
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  /* align-items: stretch; */
  padding: 50px 10px;
  /* width: 6em; */
`;
