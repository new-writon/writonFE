import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import { postwritingSubmit } from "@/apis/WritingPage";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import { DateResponsiveState, modalBackgroundState, postWritingDataState } from "@/recoil/atoms";
import { writingPagePopUpProps } from "@/types";

import { Container, ContainerResponsive } from "./style";

export const CompletePopup = ({ onClick, setpopUpOn }: writingPagePopUpProps) => {
  return (
    <Container>
      <div className="popUpTitle completePopup">글 작성을 완료할까요?</div>
      <div className="popUpmessage">작성을 완료하면, 공개 설정한 질문은 커뮤니티에 공개돼요.</div>
      <div className="popUpBtn">
        <div
          className="close"
          onClick={() => setpopUpOn(false)}
        >
          취소
        </div>
        <div
          className="complete"
          onClick={onClick}
        >
          완료
        </div>
      </div>
    </Container>
  );
};

export const CompletePopupResponsive = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useRecoilState(modalBackgroundState);
  const postWritingData = useRecoilValue(postWritingDataState);
  const DateResponsive = useRecoilValue(DateResponsiveState);
  const executeAsyncTask = useAsyncWithLoading();
  const submitWrite = async () => {
    executeAsyncTask(async () => {
      const response = await postwritingSubmit(
        localStorage.getItem("organization") || "",
        localStorage.getItem("challengeId") || "1",
        DateResponsive || "",
        postWritingData
      );
      console.log(response);
      navigate("/");
      setModal({ ...modal, completeModal: false });
      document.body.style.overflowY = "auto";
    });
  };

  return (
    <ContainerResponsive>
      <div className="contentBox">
        <div className="popUpTitle">글 작성을 완료할까요?</div>
        <div className="popUpmessage">작성을 완료하면, 공개 설정한 질문은 커뮤니티에 공개돼요.</div>
        <div className="popUpBtn">
          <div
            className="close"
            onClick={() => {
              setModal({ ...modal, completeModal: false });
              document.body.style.overflowY = "auto";
            }}
          >
            취소
          </div>
          <div
            className="complete"
            onClick={submitWrite}
          >
            완료
          </div>
        </div>
      </div>
    </ContainerResponsive>
  );
};
