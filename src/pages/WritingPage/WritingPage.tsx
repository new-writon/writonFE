/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { getBasicQuestion, getSpecialQuestion } from "@/apis/WritingPage";
import { getCalendarRecordCurrent } from "@/apis/mainPage";
import { WeekCalendar } from "@/components/WritingPage/WeekCalendar";
import { getBasicQuestionState, getSpecialQuestionState } from "@/recoil/atoms";
import { CalendarRecordCurrentType } from "@/types";

import { WritingBox } from "./WritingBox";

export const WritingPage = () => {
  const [CalendarData, setCalendarData] = useState<CalendarRecordCurrentType[]>([]);
  const setGetBasicQuestionData = useSetRecoilState(getBasicQuestionState);
  const setGetSpecialQuestionData = useSetRecoilState(getSpecialQuestionState);

  const writingPageRendering = async () => {
    try {
      const result = await Promise.all([
        getCalendarRecordCurrent(
          localStorage.getItem("organization") || "",
          localStorage.getItem("challengeId") || "1",
          "2024-01"
        ),
        getBasicQuestion(localStorage.getItem("challengeId") || "1"),
        getSpecialQuestion(localStorage.getItem("challengeId") || "1"),
      ]);
      console.log(result);
      setCalendarData(result[0]);
      setGetBasicQuestionData(result[1]);
      setGetSpecialQuestionData(result[2]);
    } catch {
      throw new Error("shit");
    }
  };
  useEffect(() => {
    writingPageRendering();
  }, []);
  return (
    <Container>
      <WeekCalendar CalendarData={CalendarData} />
      <WritingBox />
    </Container>
  );
};

const Container = styled.div`
  background: var(--Gray2_100, #f5f5f5);
  padding-top: 30px;
  padding-bottom: 66px;
  position: relative;
`;