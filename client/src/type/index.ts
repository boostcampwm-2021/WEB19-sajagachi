export interface ItemType {
  id: number;
  category: string;
  title: string;
  content: string;
  capacity: number;
  participantCnt: number;
  deadline: string;
  finished: boolean;
  lat: number;
  long: number;
}

export interface LocationType {
  lat: number;
  lng: number;
  isLoaded?: boolean;
}

export interface LoginUserType {
  id: number;
  name: string;
  isSigned: boolean;
}

export interface QueryStringType {
  nextCursor?: number;
  limit?: number;
  category?: number[];
  finished?: boolean | undefined;
  lat?: number;
  long?: number;
  search?: string;
  cursor?: number;
}

export type ParticipantType = {
  point: number | null;
  user: {
    id: number;
    name: string;
    img: string;
  };
};

export type UserInfoType = {
  userId: number;
  userName: string;
};

export interface MessageType {
  sender: string;
  msg?: string;
  img?: string;
  time: string;
  isMe: number;
  created_at: string;
  modalOn?: Function;
}
