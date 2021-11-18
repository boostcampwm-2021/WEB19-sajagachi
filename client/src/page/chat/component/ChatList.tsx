import React, { useRef, useEffect, useState, useCallback } from 'react';
import { css } from '@emotion/react';
import MyChatMessage from './MyChatMessage';
import OtherChatMessage from './OtherChatMsg';
import { Socket } from 'socket.io-client';
import { createQueryString, fetchGet } from '../../../util/index';
import { getCurrentTime } from '../../../util/index';
import { CircularProgress } from '@mui/material';
import { UserInfoType } from '../../../type';

const ProgressStyle = {
  color: '#f76a6a',
  marginLeft: '5px'
};

const ChatLayout = css`
  margin: 5px 0px 0px 0px;
  height: 79vh;
  background-color: #ffffff;
  padding-top: 15px;
  overflow: scroll;
  overflow-x: hidden;
  padding-left: 20px;
  padding-right: 20px;
`;

const StickyHeader = css`
  display: flex;
  justify-content: center;
  flex: 1;
  width: 100%;
  position: sticky;
  top: 14px;
  & button {
    font-weight: bold;
    font-size: 13px;
    height: 28px;
    line-height: 27px;
    padding: 0 16px;
    z-index: 2;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
    box-shadow: 0 0 0 1px var(--saf-0), 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    border-radius: 24px;
    position: relative;
    top: -13px;
    background: white;
    border: none;
    outline: none;
  }
`;

type MessageType = {
  sender: string;
  msg: string;
  time: string;
  isMe: boolean;
  created_at: string;
};

type ResultChat = {
  id: number;
  userId: number;
  postId: number;
  msg: string | null;
  img: string | null;
  created_at: string;
};

const getAMPMTime = (date: Date) => {
  let currentHour = date.getHours();
  const currentMinutes = date.getMinutes();
  const strAmPm = currentHour < 12 ? '오전 ' : '오후 ';
  currentHour = currentHour < 12 ? currentHour : currentHour - 12;
  return strAmPm + currentHour + '시 ' + currentMinutes + '분';
};

const checkBetweenFromTo = (target: number, from: number, to: number) => {
  if (target >= from && target <= to) return true;
  return false;
};

export default function ChatList({
  postId,
  user,
  socket
}: {
  postId: number;
  user: UserInfoType;
  socket: Socket;
}) {
  const [isFetch, setIsFetch] = useState(false);
  const [chatDatas, setChatDatas] = useState<any>([]);
  const isEnd = useRef(false);
  const cursor = useRef<number>();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const loader = useRef(null);
  const parent = useRef<HTMLDivElement>(null);

  const manufactureChats = (chats: Array<ResultChat>): Array<MessageType> => {
    return chats
      .map(chat => {
        return {
          sender: String(chat.userId),
          msg: chat.msg,
          time: getAMPMTime(new Date(chat.created_at)),
          isMe: chat.userId === user.userId ? true : false,
          created_at: chat.created_at
        } as MessageType;
      })
      .reverse();
  };
  const checkMe = (sender: number) => {
    return sender === user.userId;
  };

  const makeSection = (chatDatas: MessageType[]) => {
    const sections: { [key: string]: MessageType[] } = {};
    chatDatas.forEach(chat => {
      const monthDate = MakeDateFormat(new Date(chat.created_at));
      if (Array.isArray(sections[monthDate])) {
        sections[monthDate].push(chat);
      } else {
        sections[monthDate] = [chat];
      }
    });
    return sections;
  };

  const MakeDateFormat = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month >= 10 ? month : '0' + month}-${
      day >= 10 ? day : '0' + day
    }`;
  };

  useEffect(() => {
    socket.on('receiveMsg', (user: number, msg: string) => {
      const isMe = checkMe(user);
      const bottom =
        (parent.current?.scrollHeight as number) -
        (parent.current?.scrollTop as number) -
        (parent.current?.clientHeight as number);

      setChatDatas((chatDatas: MessageType[]) => {
        return [
          ...chatDatas,
          {
            sender: user,
            msg,
            time: getCurrentTime(),
            isMe
          }
        ];
      });

      if (isMe || checkBetweenFromTo(bottom, 0, 10)) {
        messageEndRef.current?.scrollIntoView({
          behavior: 'auto',
          block: 'start',
          inline: 'nearest'
        });
      }
    });
  }, []);

  const handleObserver: IntersectionObserverCallback = async (
    entry,
    observer
  ) => {
    const target = entry[0];
    if (target.isIntersecting && !isEnd.current) {
      console.log('hi');
      observer.unobserve(target.target);
      setIsFetch(true);

      const heightBeforeFetch = parent.current?.scrollHeight;
      try {
        const result: Array<ResultChat> = await fetchGet(
          `${process.env.REACT_APP_SERVER_URL}/api/chat/${postId}`,
          createQueryString({
            cursor: cursor.current,
            limit: LIMIT
          })
        );
        if (result.length < LIMIT) {
          isEnd.current = true;
          observer.unobserve(target.target);
        }
        const manufacturedChats = manufactureChats(result);
        cursor.current = result[result.length - 1].id;
        setChatDatas((chatDatas: MessageType[]) => {
          return [...manufacturedChats, ...chatDatas];
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsFetch(false);
        const heightAfterFetch = parent.current?.scrollHeight;
        parent.current?.scrollTo(
          0,
          (heightAfterFetch as number) - (heightBeforeFetch as number)
        );
        observer.observe(target.target);
      }
    }
  };

  useEffect(() => {
    const option = {
      root: parent.current,
      threshold: 1
    };

    const loadObserver = new IntersectionObserver(handleObserver, option);
    if (loader.current) loadObserver.observe(loader.current);
    return () => {
      if (loader.current) loadObserver.unobserve(loader.current);
    };
  }, []);

  return (
    <div css={ChatLayout} ref={parent}>
      {isFetch && <CircularProgress size={25} sx={ProgressStyle} />}
      <div ref={loader} />
      {chatDatas.map((chat: MessageType) => {
        return chat.isMe ? (
          <MyChatMessage msgData={chat} />
        ) : (
          <OtherChatMessage msgData={chat} />
        );
      })}
      <div key="messageEndDiv" ref={messageEndRef}></div>
    </div>
  );
}

const LIMIT = 20;
