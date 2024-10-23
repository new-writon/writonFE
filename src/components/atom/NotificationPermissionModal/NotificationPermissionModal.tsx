import { patchNotificationPermission } from "@/apis/notification";
import { handleAllowNotification } from "@/core/notification/notificationFunc";
import { loadingState, modalBackgroundState, snackBarState } from "@/recoil/atoms";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

const NotificationPermissionModal = () => {
  const setIsLoading = useSetRecoilState(loadingState);
  const setModal = useSetRecoilState(modalBackgroundState);
  const [snackBar, setSnackBar] = useRecoilState(snackBarState);

  const handleClick = async (type: "granted" | "denied") => {
    setModal((modal) => ({ ...modal, notificationPermissionModal: false }));

    if (type === "denied") {
      await patchNotificationPermission("denied");
      document.body.style.overflowY = "scroll";
      return;
    }

    if (type === "granted") {
      setIsLoading(true);
      try {
        const notificationResult = await handleAllowNotification(); // 비동기 함수 실행 후 기다림
        if (notificationResult !== "default" && notificationResult !== undefined) {
          await patchNotificationPermission(notificationResult);
          console.log(`알림 ${notificationResult === "granted" ? "허용 완료" : "허용 거부"}`);
          if (notificationResult === "granted") {
            setSnackBar({ ...snackBar, notificationSnackBar: true });
            setTimeout(() => {
              setSnackBar({ ...snackBar, notificationSnackBar: false });
            }, 2000);
          }
        } else {
          alert("알림 선택이 되지 않았습니다.");
        }
      } catch (error) {
        console.error("에러 발생:", error);
      } finally {
        setIsLoading(false);
        document.body.style.overflowY = "scroll"; // granted의 로딩 후에 실행
      }
    }
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
  }, []);

  return (
    <Wrapper>
      <Container>
        <Text>
          <Text_Bold>‘Writon’에서 알림을 보내고자 합니다.</Text_Bold>
          <Text_light>댓글, 좋아요 알림</Text_light>
        </Text>
        <Buttons>
          <Button
            $type={false}
            onClick={() => handleClick("denied")}
            // 여기서 db에 status 값 바꿔줌. denied
          >
            허용 안 함
          </Button>
          <Button
            $type={true}
            onClick={() => handleClick("granted")}
          >
            허용
          </Button>
        </Buttons>
      </Container>
    </Wrapper>
  );
};

export default NotificationPermissionModal;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999999;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
`;

const Container = styled.div`
  background-color: var(--White, #fff);
  border-radius: 12px;
  padding: 24px;
  max-height: fit-content;
  display: flex;
  gap: 32px;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 400px;

  @media (min-width: 531px) {
    width: 100%;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Text_Bold = styled.span`
  color: var(--Gray-100, #212121);
  font-size: 18px;
  font-weight: 700;
  line-height: 150%;
`;

const Text_light = styled.span`
  color: var(--Gray-80, #464c52);
  font-size: 14px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.div<{ $type: boolean }>`
  background-color: ${({ $type }) => ($type ? "var(--Main-50, #6272FF)" : "var(--White, #fff)")};
  color: ${({ $type }) => ($type ? "var(--White, #fff)" : "var(--Gray-90, #2C2F32)")};
  border: ${({ $type }) =>
    $type ? "1px solid var(--Main-50, #6272FF);" : "1px solid var(--Gray-40, #d2d5db);"};
  border-radius: 10px;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  text-align: center;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
`;