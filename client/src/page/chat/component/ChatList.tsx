import React, { useRef, useEffect, useState, RefObject } from 'react';
import { css } from '@emotion/react';
import { Socket } from 'socket.io-client';
import MyChatMessage from './MyChatMessage';
import OtherChatMessage from './OtherChatMsg';
import SystemMessage from './SystemMessage';
import ImageModal from './ImageModal';
import LoadingSpinner from '../../../common/loading-spinner';
import service from '../../../util/service';
import { isBetweenFromTo, MakeDateFormat } from '../../../util/index';
import { UserInfoType, MessageType } from '../../../type';

interface ResultChat {
  id: number;
  userId: number;
  msg: string | null;
  img: string | null;
  created_at: string;
  name: string;
}

interface ChatListType {
  postId: number;
  user: UserInfoType;
  socket: Socket;
  popError: Function;
}

export default function ChatList({ postId, user, socket, popError }: ChatListType) {
  const [isFetch, setIsFetch] = useState(false);
  const [chatDatas, setChatDatas] = useState<any>([]);
  const [imageModalOn, setImageModalOn] = useState('');
  const [isEnd, setIsEnd] = useState(false);
  const cursor = useRef<number>();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const loader = useRef(null);
  const parent = useRef<HTMLDivElement>(null);
  const manufactureChats = (chats: Array<ResultChat>): Array<MessageType> => {
    return chats.map(chat => createChatData(chat.userId, chat.name, chat.msg, chat.img)).reverse();
  };

  const handleObserver: IntersectionObserverCallback = async (entry, observer) => {
    const target = entry[0];
    if (target.isIntersecting && !isEnd) {
      observer.unobserve(target.target);
      setIsFetch(true);

      const scrollHeightBeforeFetch = parent.current?.scrollHeight;
      try {
        const result: Array<ResultChat> = await service.getChats(postId, cursor.current, CHAT_LIMIT);
        if (result.length < CHAT_LIMIT) {
          setIsEnd(true);
          observer.unobserve(target.target);
          if (result.length === 0) return;
        }
        const manufacturedChats = manufactureChats(result);

        cursor.current = result[result.length - 1].id;
        setChatDatas((chatDatas: MessageType[]) => {
          return [...manufacturedChats, ...chatDatas];
        });
        const scrollHeightAfterFetch = parent.current?.scrollHeight;
        parent.current?.scrollTo(0, (scrollHeightAfterFetch as number) - (scrollHeightBeforeFetch as number));
        observer.observe(target.target);
      } catch (err: any) {
        popError(err.message);
      } finally {
        setIsFetch(false);
      }
    }
  };
  useIntersectionObserver(loader, handleObserver, { root: parent.current, threshold: 1 });

  useEffect(() => {
    socket.on('receiveMsg', (user: number, userName: string, msg: string) => {
      setChatDatas((chatDatas: MessageType[]) => {
        return [...chatDatas, createChatData(user, userName, msg, null)];
      });
      if (checkSender(user) === SENDER_TYPE.ME) moveScrollToBottom();
    });
    socket.on('sendImg', (user: number, userName: string, img: string) => {
      setChatDatas((chatDatas: MessageType[]) => {
        return [...chatDatas, createChatData(user, userName, null, img)];
      });
      if (checkSender(user) === SENDER_TYPE.ME) moveScrollToBottom();
    });
    return () => {
      socket.off('receiveMsg');
      socket.off('sendImg');
    };
  }, []);

  const checkSender = (sender: number) => {
    if (sender === SENDER_TYPE.SYSTEM) return SENDER_TYPE.SYSTEM;
    else if (sender === user.userId) return SENDER_TYPE.ME;
    else return SENDER_TYPE.OTHER;
  };
  const moveScrollToBottom = () => {
    const bottom =
      (parent.current?.scrollHeight as number) -
      (parent.current?.scrollTop as number) -
      (parent.current?.clientHeight as number);
    if (isBetweenFromTo(bottom, 0, 10)) {
      messageEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
    }
  };
  const createChatData = (user: number, userName: string, msg: string | null = null, img: string | null = null) => {
    const isMe = checkSender(user);
    const chatData: MessageType = {
      sender: userName,
      isMe,
      msg,
      img: process.env.REACT_APP_IMAGE_URL + '' + img,
      created_at: new Date().toString()
    };
    if (img) chatData.modalOn = setImageModalOn;
    return chatData;
  };
  const chatSections = makeSection(chatDatas);
  return (
    <>
      <div css={ChatLayout} ref={parent}>
        {isFetch && <LoadingSpinner />}
        {!isEnd && <div ref={loader} />}
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <div key={date}>
              <div css={StickyHeader}>
                <button>{date}</button>
              </div>
              {chats.map((chat: MessageType, index) => {
                if (chat.isMe === SENDER_TYPE.SYSTEM) return <SystemMessage msgData={chat} key={index} />;
                else if (chat.isMe === SENDER_TYPE.ME) return <MyChatMessage msgData={chat} key={index} />;
                else return <OtherChatMessage msgData={chat} key={index} />;
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

const CHAT_LIMIT = 20;

const SENDER_TYPE = {
  SYSTEM: 0,
  ME: 1,
  OTHER: 2
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

const useIntersectionObserver = (
  targetElement: RefObject<HTMLElement>,
  callback: IntersectionObserverCallback,
  option: any | null
) => {
  const observerRef = useRef<IntersectionObserver>();
  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, option);
    if (targetElement.current) observerRef.current.observe(targetElement.current);
    return () => {
      if (observerRef.current && targetElement.current) observerRef.current.unobserve(targetElement.current);
    };
  }, []);
};
