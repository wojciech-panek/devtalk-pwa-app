import styled from 'styled-components';


export const Container = styled.div`
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  top: 10%;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  `;

export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: column;
  padding: 20px;
  background-color: #FBF8E7;
  border: 2px solid #6B4B3A;
  border-radius: 10px;
  max-width: 400px;
  font-family: 'Arial';
  text-align: left;
`;

export const Icon = styled.img`
    width: 30px;
    height: 30px;
    background-color: gray;
    border-radius: 4px;
    margin: 0 2px;
`;

export const Ul = styled.ul``;

export const Li = styled.li``;

export const P = styled.p``;
