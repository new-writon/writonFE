import styled from "styled-components";

export const Container = styled.div<{ $font: number }>`
  color: var(--Gray-100, #1b1d1f);
  font-size: ${(props) => `${props.$font}rem`};
  font-weight: 700;
  margin: auto 0;
  line-height: 22px;
  display: flex;
  /* @media (max-width: 530px) {
    font-size: 1.125rem;
  } */
  .number {
    color: var(--Main-50, #6272ff);
    margin-left: 5px;
    font-size: 1.25rem;
  }
  span,
  p {
    display: flex;
    font-size: ${(props) => `${props.$font}rem`};
  }
  @media (max-width: 565px) {
    display: block;
    &:has(.number) {
      font-size: 1.25rem;
    }
    &:has(.second) {
      display: flex;
    }
  }
`;
