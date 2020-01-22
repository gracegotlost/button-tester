import styled, { css } from 'styled-components';

const PrimaryButton = styled.button`
  display: inline;
  border: none;
  border-radius: 4px;
  width: 250px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
  background-color: #006AFF;
  ${props => props.duration && css`
    transition: background-color ${props.duration}s;
  `};

  &:hover {
    background-color: #0D4599;
  }

  &:active {
    background-color: #001751;
  }

  &[disabled] {
    background-color: rgba(0, 106, 255, 0.4);
    cursor: default;
  }

  ${props => props.enabled && css`
    background-color: #001751;
  `};
`;

export default PrimaryButton;
