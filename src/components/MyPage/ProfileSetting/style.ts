import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  width: 805px;
  border-radius: 16px;
  margin-bottom: 300px;
  padding: 50px 50px 80px 60px;
  max-height: 700px;
  .title {
    color: #000;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 130%; /* 23.4px */
  }
  .editField {
    display: flex;
    padding: 15px 0;
    max-width: 443px;
    justify-content: space-between;
    align-items: center;
  }
  .editTitle {
    color: var(--Gray-60, #959595);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
  }
  .editText {
    width: 300px;
    height: 40px;
    padding: 15px;
    gap: 10px;
    border-radius: 8px;
    background: var(--Gray-10, #fafafa);
    color: var(--Gray-100, #212121);
    font-size: 0.875rem;
    font-weight: 600;
  }
  .editText.account {
    color: var(--Gray-60, #959595);
    position: relative;
  }
  .editJob {
    width: 300px;
    display: flex;
  }
  .editEmail {
    color: var(--Gray-50, #bdbdbd);
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;

  .editBtn {
    padding: 9px 12px 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%; /* 22.4px */
    cursor: pointer;
  }
  .editBtn.notactive {
    background: var(--purple-50, #6a63f5);
    color: var(--White, #fff);
  }
  .editBtn.active {
    background: var(--Gray-30, #eee);
    color: var(--Gray-60, #959595);
  }
`;

export const BasicSetting = styled.div``;

export const ChallengeSetting = styled.div`
  margin-top: 40px;
  .jobField {
    max-width: 480px;
    .editJob {
      width: max-content;
      display: flex;
      gap: 8px;
    }
  }
  .jobIntroduceField {
    align-items: flex-start;
  }
  textarea {
    width: 100%;
    height: 104px;
    border-radius: 8px;
    border: 1px solid var(--Gray-40, #d9d9d9);
    background: var(--White, #ffff);
    outline: none;
    padding: 16px;
    box-sizing: border-box;
    resize: none;
    font-size: 1rem;
    caret-color: #6a63f5;
    color: var(--Gray-100, #212121);
    line-height: 24px;
    overflow-y: hidden;
    &::placeholder {
      color: var(--Gray-60, #959595);
      font-size: 1rem;
      line-height: 150%; /* 24px */
      white-space: pre-wrap;
    }
    &:focus {
      &::placeholder {
        opacity: 0;
      }
    }
  }
`;

export const EditBox = styled.div`
  width: 300px;
  position: relative;
  .inputNickname {
  }
  .error {
    color: var(--Error_50, #dc362e);
  }
  .success {
    color: var(--purple-50, #6a63f5);
  }
  .dupliBtn {
    color: var(--Gray-60, #959595);
  }
  .title {
    color: var(--Gray10_900, #212121);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 160%;
  }
  .parityCheck {
    width: 100%;
    position: absolute;
    margin-top: 6px;
    display: flex;
    font-size: 0.75rem;
    p {
      font-size: 0.75rem;
    }
  }
  .textCheck {
    position: absolute;
    left: 0;
  }
  .numCheck {
    position: absolute;
    right: 0;
    font-size: 0.75rem;
    color: var(--Gray-60, #959595);
  }
  input {
    border-radius: 8px;
    border: 1px solid var(--Gray-40, #d9d9d9);
    background: var(--White, #ffff);
  }
`;

export const DuplicateBtn = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 0.875rem;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 16px;
  color: var(--Shadow_Blue, #135ff3);
  cursor: pointer;
`;

export const EditButton = styled.div`
  margin-top: 77px;
  display: flex;
  gap: 16px;
  justify-content: center;
  div {
    padding: 16px 30px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    line-height: 150%; /* 24px */
    cursor: pointer;
  }
  .editCloseBtn {
    background: var(--Purple-10, #f0efff);
    color: var(--purple-50, #6a63f5);
  }
  .editCompleteBtn {
    background: var(--purple-50, #6a63f5);
    color: var(--White, #fff);
  }
`;

export const AccountButton = styled.div`
  padding: 9px 12px 7px;
  border-radius: 10px;

  font-size: 0.875rem;
  font-weight: 600;
  line-height: 160%; /* 22.4px */
  position: absolute;
  right: -80px;
  top: 0;
  cursor: pointer;
  background: var(--Purple-10, #f0efff);
  color: var(--purple-50, #6a63f5);
  &:hover {
    background: var(--purple-50, #6a63f5);
    color: var(--White, #fff);
  }
`;