import styled, { css } from 'styled-components';

const CautionButton = styled.button`
  display: inline;
  border-radius: 4px;
  width: 250px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: #FFF;
  background-color: #E82B27;
  border: 1px solid #E82B27;
  ${props => props.duration && css`
    transition: background-color ${props.duration}s;
  `};

  &:hover {
    background-color: #FFF;
    border: 1px solid #A3000B;
    color: #A3000B;
  }

  &:active {
    background-color: #A3000B;
    border: 1px solid #A3000B;
    color: #FFF;
  }

  &[disabled] {
    background-color: rgba(232, 43, 39, 0.4);
    border: 1px solid rgba(232, 43, 39, 0.4);
    color: #FFF;
    cursor: default;
  }

  ${props => props.enabled && css`
    background-color: #A3000B;
    border: 1px solid #A3000B;
    color: #FFF;
  `};
`;

export default CautionButton;
