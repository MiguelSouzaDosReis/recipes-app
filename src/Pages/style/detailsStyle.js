import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

const CarouselsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 350px;
  width: 650px;
`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 300px;
  height: 300px;
`;

export default CarouselsContainer;
