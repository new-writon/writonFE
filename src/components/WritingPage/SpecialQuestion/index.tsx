import { useRef, useState } from "react";

import { useRecoilState } from "recoil";

import close from "@/assets/mainPage/close.svg";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { ToggleBtnBox } from "@/components/atom/QuestionBox/style";
import { TitleSideBox } from "@/components/atom/TitleSideBox";
import { DeletePopup } from "@/components/atom/WritingPopup/DeletePopup";
import { addSpecialQuestionArrayState, addSpecialQuestionState } from "@/recoil/atoms";
import { addSpecialQuestionArrayType } from "@/types";

import { Container } from "./style";

export const SpecialQuestion = ({
  data,
  idx,
}: {
  data: addSpecialQuestionArrayType;
  idx: number;
}) => {
  const [isClickArray, setIsClickArray] = useRecoilState(addSpecialQuestionState); //사이드 바에 있는 추가한 거 지우기 recoil
  const [addSpecialQuestionData, setAddSpecialQuestionData] = useRecoilState(
    addSpecialQuestionArrayState
  );
  const [toggleSwitchOn, setToggleSwitchOn] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>("");
  const [popUpOn, setpopUpOn] = useState<boolean>(false);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };
  const deleteQuestion = (question_id: number) => {
    setAddSpecialQuestionData(
      addSpecialQuestionData.filter((question) => question.question_id !== question_id) // 해당되는 id 값 배열에서 삭제
    );
    setIsClickArray(isClickArray.filter((id) => id !== question_id));
    setpopUpOn(false);
  };
  return (
    <Container>
      <div className="category">
        <TitleSideBox type="special">스페셜 질문</TitleSideBox>
        <img
          src={close}
          alt="X"
          onClick={() => setpopUpOn(!popUpOn)}
        />
        {popUpOn && (
          <DeletePopup
            onClick={() => deleteQuestion(data?.question_id)}
            setpopUpOn={setpopUpOn}
          />
        )}
      </div>
      <div className="qeustionBox">
        <div className="title">
          <MainSemiTitle font={1.125}>
            {idx + 1}. {data?.question}
          </MainSemiTitle>
          <ToggleBtnBox $toggleSwitchOn={toggleSwitchOn}>
            {toggleSwitchOn ? "비공개" : "공개"}
            <label
              className={`toggleSwitch ${toggleSwitchOn && "active"}`}
              onClick={() => setToggleSwitchOn(!toggleSwitchOn)}
            >
              <span className="toggleButton"></span>
            </label>
          </ToggleBtnBox>
        </div>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={onChange}
          placeholder="글을 입력해주세요."
        />
      </div>
    </Container>
  );
};