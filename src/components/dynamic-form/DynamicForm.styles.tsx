import styled from "styled-components";

export const DynamicFormContainer = styled.form`
  box-shadow: 2px 6px 8px gray;
  margin-bottom: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 10px 2px;
  max-width: 650px;
`;

export const FormGroup = styled.div`
  padding: 0.5em;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;

  label {
    text-align: left;
    /* color: #2e86c1; */
  }

  input {
    margin-top: 5px;
    line-height: 1.5em;
  }

  select {
    margin-top: 5px;
    line-height: 1.5em;
  }

  button {
    padding: 0.5em;
  }
`;

export const FormGroupRadio = styled.div`
  display: flex;
  flex-direction: row;

  label {
  }
  input {
  }
`;

export const FormTitle = styled.div`
  text-align: left;
`;

export const FormActions = styled.div`
  display: flex;
  /* height: 100px; */

  button {
    width: 80px;
    line-height: 1.5em;
    background-color: #3498db;
    color: white;
    border-radius: 4px;
    border: 0;
    margin-top: 15px;
    margin-left: 5px;
    margin-bottom: 5px;
  }
`;
