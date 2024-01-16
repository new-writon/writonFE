import { ChangeEvent, FocusEvent, KeyboardEvent } from "react";

export interface InputProps {
  value: string;
  type: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  errorLine?: boolean;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  // 다른 버튼 관련 프로퍼티 추가
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface MainSemiTitleProps {
  children: React.ReactNode;
  font: number;
}
export interface TitleSideBoxProps {
  children: React.ReactNode;
  type: string;
}

export interface TooltipButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  tooltipOn: boolean;
  // 다른 버튼 관련 프로퍼티 추가
}

export interface RetrospectItemProps {
  date: string;
  special: boolean;
  preview: {
    question: string;
    content: string;
  }[];
}

export interface StoryItemProps {
  name: string;
  message: string;
  profile: string;
  job: string;
  company: string;
  oneline: string;
}

export interface CommunityItemProps {
  user: {
    name: string;
    job: string;
    company: string;
    profile?: string;
    date?: string;
  };
  comment: number;
  likeCount: number;
  preview: {
    question: string;
    content: string;
  }[];
}

export interface ChallengeCurrentType {
  nickname: string;
  overlapPeriod: number;
  challengeOverlapCount: number;
  challengeSuccessCount: number;
  overlapDeposit: number;
}
