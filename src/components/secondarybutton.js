import styled, { css } from 'styled-components';

const SecondaryButton = styled.button`
  display: inline;
  border-radius: 4px;
  width: 250px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: #006AFF;
  background-color: #FFF;
  border: 1px solid #006AFF;
  ${props => props.duration && css`
    transition: background-color ${props.duration}s;
  `};

  &:hover {
    background-color: #E0F2FF;
    color: #006AFF;
  }

  &:active {
    background-color: #001751;
    color: #FFF;
  }

  &[disabled] {
    background-color: #FFF;
    color: rgba(0, 106, 255, 0.4);
    border: 1px solid rgba(0, 106, 255, 0.4);
    cursor: default;
  }

  ${props => props.enabled && css`
    background-color: #001751;
    color: #FFF;
  `};
`;

export default SecondaryButton;
