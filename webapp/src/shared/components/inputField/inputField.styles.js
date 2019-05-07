import styled from 'styled-components';



export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  font-family: 'Arial';
  border-radius: 4px;
  border: 1px solid #6B4B3A;
  height: 30px;
  color: #6B4B3A;
  padding: 5px;
  line-height: 20px;
  font-size: 14px;
  outline: 0;
  box-shadow: none;
  
  &::placeholder {
    color: #AF6C41;
  }
`;
