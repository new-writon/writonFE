/* eslint-disable react-hooks/exhaustive-deps */
import React, { MouseEvent, useEffect, useRef, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";

import { getAgoraChat, getMyCommunityStory } from "@/apis/CommunityPage";
import topArrow from "@/assets/AgoraPage/top-arrow.svg";
import { AgoraChatMyItem, AgoraChatOtherItem } from "@/components/atom/AgoraChatItem";
import { CommentPostAgora } from "@/components/atom/CommentPostAgora";
import { SmallTalkTitle } from "@/components/atom/SmallTalkTitle";
import useAsyncWithLoading from "@/hooks/useAsyncWithLoading";
import {
  agoraDataState,
  agoraModalBoxState,
  agoraModalState,
  dateAgoraActiveState,
  dateAgoraLengthState,
} from "@/recoil/atoms";
import { Inner } from "@/style/global";
import { agoraCommentType } from "@/types";

export const AgoraPage = () => {
  const ChattingRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState<boolean>(false);
  const agoraData = useRecoilValue(agoraDataState);
  const [agoraModal, setAgoraModal] = useRecoilState(agoraModalState);
  const [agoraModalBox, setAgoraModalBox] = useRecoilState(agoraModalBoxState);

  const [chatBasicTopicData] = useState<agoraCommentType>({
    agora_comment_id: agoraData?.agoraId,
    nickname: agoraData?.nickname,
    created_time: agoraData?.createdTime,
    profile: agoraData?.profile,
    content: agoraData?.question,
    myCommentSign: "0",
  });
  const [nickname, setNickname] = useState<string>("");
  const [myProfile, setMyProfile] = useState<string>("");
  const [chatData, setChatData] = useState<agoraCommentType[]>([]);
  const dateActive = useRecoilValue(dateAgoraActiveState);
  const dateLength = useRecoilValue(dateAgoraLengthState);
  const [width, setWidth] = useState<number>(window.innerWidth);

  const executeAsyncTask = useAsyncWithLoading();

  const defaultClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 이벤트 캡쳐링 방지
  };

  const topScroll = () => {
    if (ChattingRef.current) {
      ChattingRef.current.scrollTo({
        top: 0,
        behavior: "smooth", // 스무스한 스크롤을 위해 추가
      });
    }
  };

  const AgoraPageRendering = async () => {
    executeAsyncTask(async () => {
      try {
        const data = await Promise.all([
          getAgoraChat(agoraData?.agoraId),
          getMyCommunityStory(localStorage.getItem("challengeId") || "1"),
        ]);
        setChatData(data[0]);
        setMyProfile(data[1].profile);
        setNickname(data[1].nickname);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (ChattingRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = ChattingRef.current;
        console.log(scrollTop, scrollHeight, clientHeight);
        if (scrollHeight === 0) {
          setScrollTop(false); // 현재 높이가 0일 때
        } else if (scrollTop + clientHeight + 1 > scrollHeight) {
          // 스크롤이 맨 아래에 있을 때
          setScrollTop(false);
        } else {
          if (ChattingRef.current.scrollTop !== 0) {
            setScrollTop(true); // 스크롤이 맨 위에 있지 않을 때
          } else {
            setScrollTop(false); // 스크롤이 맨 위에 있을때
          }
        }
      }
    };

    if (ChattingRef.current) {
      ChattingRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (ChattingRef.current) {
        ChattingRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [ChattingRef]);

  // 동적으로 요소 생성시, 데이터 감지 하고 있다가 그 위치 재렌더링
  useEffect(() => {
    // 스크롤 가능한 요소가 있는 경우에만 실행
    const measureHeight = () => {
      if (ChattingRef.current) {
        // scrollHeight를 통해 스크롤 가능한 요소의 전체 높이를 가져옴
        const currentHeight = ChattingRef.current.scrollHeight;
        ChattingRef.current.scrollTop = currentHeight;
        // 스크롤 이벤트 핸들러 등록
      }
    };

    // 컴포넌트가 처음 렌더링될 때와 요소가 변경될 때마다 높이를 측정
    measureHeight();
    window.addEventListener("resize", measureHeight);
    return () => {
      window.removeEventListener("resize", measureHeight);
    };
  }, [ChattingRef, chatData]);

  useEffect(() => {
    AgoraPageRendering();
  }, []);

  useEffect(() => {
    if (!agoraModal) {
      const timer = setTimeout(() => {
        setAgoraModalBox(false);
      }, 600); // 애니메이션의 지속 시간과 동일한 시간 설정
      return () => clearTimeout(timer);
    } else {
      setAgoraModalBox(true);
    }
  }, [agoraModal]);

  const handleResize = () => {
    //뷰크기 강제로 강져오기
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); //clean
  }, [width]);
  return (
    <Inner>
      <Container
        onClick={() => {
          setAgoraModalBox(false);
          if (width < 531) {
            document.body.style.position = "relative";
            setTimeout(() => {
              setAgoraModal(false);
            }, 600);
          } else {
            document.body.style.overflowY = "scroll";
            setAgoraModal(false);
          }
        }}
        $agoraModalBox={agoraModalBox}
      >
        <div
          className="agora-box"
          onClick={(e) => defaultClick(e)}
        >
          <Top>
            <SmallTalkTitle
              date={dateActive[dateLength] || "2024-01-02"}
              number={5}
            />
            <div className="small-talk-title">
              <span className="topic">{agoraData?.question}</span>
              <div className="participant">{agoraData?.participateCount}명 참여</div>
            </div>
          </Top>
          <Chatting ref={ChattingRef}>
            <AgoraChatOtherItem
              type="topic"
              data={chatBasicTopicData}
            />
            {chatData?.map((chatData, idx) => {
              if (chatData?.myCommentSign === "0") {
                return (
                  <React.Fragment key={idx}>
                    <AgoraChatOtherItem data={chatData} />
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={idx}>
                    <AgoraChatMyItem data={chatData} />
                  </React.Fragment>
                );
              }
            })}
          </Chatting>
          <Bottom>
            <CommentPostAgora
              nickname={nickname}
              myProfile={myProfile}
              agoraId={agoraData?.agoraId}
              chatData={chatData}
              setChatData={setChatData}
              agoraDate={agoraData?.createdDate}
            />
          </Bottom>
          {scrollTop && (
            <div
              className="top-arrow"
              onClick={topScroll}
            >
              <img
                src={topArrow}
                alt="^"
              />
            </div>
          )}
        </div>
      </Container>
    </Inner>
  );
};

const slideIn = keyframes`
  from {
    transform: translate(-50%, 100%); /* NEW */
  }
  to {
    transform: translate(-50%, 0); /* NEW */

  }
`;

const slideOut = keyframes`
  from {
    transform: translate(-50%, 0); /* 변경 */
  }
  to {
    transform: translate(-50%, 100%); /* 변경 */
  }
`;

const Container = styled.div<{ $agoraModalBox: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  z-index: 9999999;
  display: flex;
  justify-content: center;
  overflow: scroll;
  padding: 60px 30px 254px;

  .agora-box {
    background-color: var(--White);
    min-width: 600px;
    max-width: 600px;
    min-height: 770px;
    height: fit-content;
    position: relative;
    border-radius: 16px;
    position: relative;
  }
  .agora-box .top-arrow {
    z-index: 9999;
    position: absolute;
    bottom: 145px;
    right: 32px;
    border-radius: 50%;
    border: 1px solid var(--Gray-30, #edeef1);
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0px 4px 30px 0px rgba(33, 33, 33, 0.05);
    width: 40px;
    height: 40px;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  @media (max-width: 530px) {
    overflow-y: hidden;
    padding: 0;
    left: 50%;
    transform: translateX(-50%);
    animation: ${(props) => (props.$agoraModalBox ? slideIn : slideOut)} 0.6s ease-in-out forwards;
    /* animation: ${slideOut} 0.6s ease-in-out forwards; */

    .agora-box {
      min-width: 100vw;
      min-height: fit-content;
      border-radius: 0;
      border-top-right-radius: 16px;
      border-top-left-radius: 16px;
      position: absolute;
      bottom: 0;
    }
    .agora-box .top-arrow {
      right: 16px;
      bottom: 110px;
    }
  }
`;

const Top = styled.div`
  width: 100%;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  border-bottom: 1px solid var(--Gray-30, #edeef1);
  .small-talk-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .small-talk-title .topic {
    color: var(--Gray-100, #212121);
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    max-width: calc(100% - 60px);
    max-height: 23px;
    text-align: center;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    display: -webkit-box; // 얘네를 추가히준다
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .small-talk-title .participant {
    color: var(--Gray-70, #73777e);
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 130%; /* 15.6px */
  }

  @media (max-width: 530px) {
    padding: 20px 16px 24px;
  }
`;

const Chatting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 32px;
  min-height: 554px;
  max-height: 554px;
  overflow-y: scroll;
  background-color: #fcfcfc;
  @media (max-width: 530px) {
    min-height: 39vh;
    min-height: calc(var(--vh, 1vh) * 100 - 330px);
    max-height: 340px;
    padding: 20px 16px;
  }
`;

const Bottom = styled.div`
  padding: 24px 32px;
  border-top: 1px solid var(--Gray-30, #edeef1);
  @media (max-width: 530px) {
    padding: 16px;
  }
`;
