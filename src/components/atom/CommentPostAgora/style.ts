import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  position: relative;
  .profileImageCover {
    width: 24px;
    height: 24px;
    overflow: hidden;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--Gray-30, #eee);
    background-origin: border-box;
    cursor: pointer;
  }
  .profileImageCover img {
    width: inherit;
  }

  textarea {
    width: calc(100% - 90px);
    max-width: 543px;
    height: 60px;
    line-height: 160%;
    border-radius: 10px;
    outline: none;
    border-radius: 10px;
    border: 1px solid var(--Gray-30, #edeef1);
    background: var(--Base-White, #fff);
    padding: 8px 12px;
    box-sizing: border-box;
    resize: none;
    font-size: 0.875rem;
    caret-color: var(--Gray-100);
    color: var(--Gray-100);
    overflow-y: hidden;
    &::placeholder {
      line-height: 160%;
      font-size: 0.875rem;
      font-weight: 400;
      color: var(--Gray-60, #94989f);
    }
    &:focus {
      border: 1px solid var(--Gray-30, #eee);
      &::placeholder {
        opacity: 0;
      }
    }
  }

  button {
    height: inherit;
    border-radius: 10px;
    background: var(--Purple-10, #f0efff);
    padding: 8px 12px;
    color: var(--purple-50, #6a63f5);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
    border: none;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
  button.abled:hover {
    background: var(--Purple-60, #524dd4);
    color: var(--White);
  }
  button.abled {
    background: var(--purple-50, #6a63f5);
    color: var(--White);
  }
`;