import { useState } from "react";

import { format, getISOWeek } from "date-fns";

import downArrow from "@/assets/mainPage/downArrow.svg";
import topArrow from "@/assets/mainPage/topArrow.svg";
import { MainSemiTitle } from "@/components/atom/MainSemiTitle";
import { TooltipButton } from "@/components/atom/TooltipButton";
import { TooltipMessage } from "@/components/atom/TooltipMessage";
import { Inner } from "@/style/global";

import { RenderCell } from "./RenderCells";
import { RenderDays } from "./RenderDays";
import { Container } from "./style";
export const Calendar = () => {
  const today = new Date();
  const [fold, setFold] = useState<boolean>(false);
  const [tooltipOn, setTooltopOn] = useState<boolean>(false);

  return (
    <Inner>
      <Container>
        <div className="topBar">
          <div className="topBarLeft">
            <MainSemiTitle>
              {format(today, "M")}월 {getISOWeek(today)}주차 도전중
            </MainSemiTitle>
            <TooltipButton
              tooltipOn={tooltipOn}
              onClick={() => setTooltopOn(!tooltipOn)}
            >
              챌린지 방법
            </TooltipButton>
            {tooltipOn && (
              <div className="tooltipBox">
                <TooltipMessage
                  onClick={() => setTooltopOn(false)}
                  direction={"left"}
                ></TooltipMessage>
              </div>
            )}
          </div>
          <div
            className="topBarRight"
            onClick={() => setFold(!fold)}
          >
            {fold ? "달력 접기" : "달력 펼치기"}

            <img
              className={`${fold ? "topArrow" : "downArrow"}`}
              src={fold ? topArrow : downArrow}
              alt="V"
            />
          </div>
        </div>
        <RenderDays />
        <RenderCell fold={fold} />
      </Container>
    </Inner>
  );
};