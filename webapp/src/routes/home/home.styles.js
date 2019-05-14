import styled from 'styled-components';


export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const GameWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

export const Interface = styled.div`
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  top: 40%;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const InterfaceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  background-color: #FBF8E7;
  border: 2px solid #6B4B3A;
  border-radius: 10px;
  min-width: 250px;
  max-width: 250px;
  font-family: 'Arial';
  text-align: center;
`;
