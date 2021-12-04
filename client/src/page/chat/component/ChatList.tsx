import React, { useRef, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import MyChatMessage from './MyChatMessage';
import OtherChatMessage from './OtherChatMsg';
import SystemMessage from './SystemMessage';
import { Socket } from 'socket.io-client';
import { CircularProgress } from '@mui/material';
import { UserInfoType, MessageType } from '../../../type';
import ImageModal from './ImageModal';
import service from '../../../util/service';
type ResultChat = {
  id: number;
  userId: number;
  postId: number;
  msg: string | null;
  img: string | null;
  created_at: string;
  name: string;
};

type ChatListType = {
  postId: number;
  user: UserInfoType;
  socket: Socket;
  popError: Function;
};

export default function ChatList({ postId, user, socket, popError }: ChatListType) {
  const [isFetch, setIsFetch] = useState(false);
  const [chatDatas, setChatDatas] = useState<any>([]);
  const [imageModalOn, setImageModalOn] = useState('');
  const isEnd = useRef(false);
  const cursor = useRef<number>();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const loader = useRef(null);
  const parent = useRef<HTMLDivElement>(null);

  const manufactureChats = (chats: Array<ResultChat>): Array<MessageType> => {
    return chats
      .map(chat => {
        if (chat.img === null) {
          return {
            sender: chat.name,
            msg: chat.msg,
            time: getAMPMTime(new Date(chat.created_at)),
            isMe: checkSender(chat.userId),
            created_at: chat.created_at
          } as MessageType;
        } else {
          return {
            sender: chat.name,
            img: process.env.REACT_APP_IMAGE_URL + '' + chat.img,
            time: getAMPMTime(new Date(chat.created_at)),
            isMe: checkSender(chat.userId),
            created_at: chat.created_at,
            modalOn: setImageModalOn
          } as MessageType;
        }
      })
      .reverse();
  };
  const checkSender = (sender: number) => {
    if (sender === SENDER_TYPE.SYSTEM) {
      return SENDER_TYPE.SYSTEM;
    } else if (sender === user.userId) {
      return SENDER_TYPE.ME;
    } else {
      return SENDER_TYPE.OTHER;
    }
  };

  useEffect(() => {
    socket.on('sendError', err => popError(err.message));
    socket.on('receiveMsg', (user: number, userName: string, msg: string) => {
      const isMe = checkSender(user);
      const bottom =
        (parent.current?.scrollHeight as number) -
        (parent.current?.scrollTop as number) -
        (parent.current?.clientHeight as number);

      setChatDatas((chatDatas: MessageType[]) => {
        return [
          ...chatDatas,
          {
            sender: userName,
            msg,
            time: getAMPMTime(new Date()),
            isMe,
            created_at: new Date().toString()
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
    socket.on('sendImg', (user: number, userName: string, img: string) => {
      const isMe = checkSender(user);
      const bottom =
        (parent.current?.scrollHeight as number) -
        (parent.current?.scrollTop as number) -
        (parent.current?.clientHeight as number);
      setChatDatas((chatDatas: MessageType[]) => {
        return [
          ...chatDatas,
          {
            sender: userName,
            img: process.env.REACT_APP_IMAGE_URL + img,
            time: getAMPMTime(new Date()),
            isMe,
            created_at: new Date().toString(),
            modalOn: setImageModalOn
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

    return () => {
      socket.off('sendError');
      socket.off('receiveMsg');
      socket.off('sendImg');
    };
  }, []);

  const handleObserver: IntersectionObserverCallback = async (entry, observer) => {
    const target = entry[0];
    if (target.isIntersecting && !isEnd.current) {
      observer.unobserve(target.target);
      setIsFetch(true);

      const heightBeforeFetch = parent.current?.scrollHeight;
      try {
        const result: Array<ResultChat> = await service.getChats(postId, cursor.current, LIMIT);
        if (result.length < LIMIT) {
          isEnd.current = true;
          observer.unobserve(target.target);
          if (result.length === 0) return;
        }
        const manufacturedChats = manufactureChats(result);
        cursor.current = result[result.length - 1].id;
        setChatDatas((chatDatas: MessageType[]) => {
          return [...manufacturedChats, ...chatDatas];
        });
        const heightAfterFetch = parent.current?.scrollHeight;
        parent.current?.scrollTo(0, (heightAfterFetch as number) - (heightBeforeFetch as number));
        observer.observe(target.target);
      } catch (err: any) {
        popError(err.message);
      } finally {
        setIsFetch(false);
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

  const chatSections = makeSection(chatDatas);
  return (
    <>
      <div css={ChatLayout} ref={parent}>
        {isFetch && <CircularProgress size={25} sx={ProgressStyle} />}
        <div ref={loader} />
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <div key={date}>
              <div css={StickyHeader}>
                <button>{date}</button>
              </div>
              {chats.map((chat: MessageType) => {
                if (chat.isMe === SENDER_TYPE.SYSTEM) {
                  return <SystemMessage msgData={chat} />;
                } else if (chat.isMe === SENDER_TYPE.ME) {
                  return <MyChatMessage msgData={chat} />;
                } else {
                  return <OtherChatMessage msgData={chat} />;
                }
              })}
            </div>
          );
        })}

        <div key="messageEndDiv" ref={messageEndRef} />
      </div>

      {imageModalOn !== '' && <ImageModal imageUrl={imageModalOn} setImageModalOn={setImageModalOn} />}
    </>
  );
}

const LIMIT = 20;

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
    border-radius: 24px;
    position: relative;
    top: -13px;
    background: white;
    border: 1px solid black;
    outline: none;
  }
`;

const getAMPMTime = (date: Date) => {
  let currentHour = date.getHours();
  const currentMinutes = date.getMinutes();
  const strAmPm = currentHour < 12 ? '오전 ' : '오후 ';
  currentHour = currentHour < 12 ? currentHour : currentHour - 12;
  if (currentHour === 0) currentHour = 12;
  return strAmPm + currentHour + '시 ' + currentMinutes + '분';
};

const checkBetweenFromTo = (target: number, from: number, to: number) => {
  if (target >= from && target <= to) return true;
  return false;
};

const MakeDateFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month >= 10 ? month : '0' + month}-${day >= 10 ? day : '0' + day}`;
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

const SENDER_TYPE = {
  SYSTEM: 0,
  ME: 1,
  OTHER: 2
};
