import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import Message from './Message';
import style from '../ChatPage.module.css';

const Messages: React.FC<{}> = ({}) => {
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    messagesAnchorRef.current?.addEventListener('scroll', () => {
      setIsAutoScroll(false);
    });
  }, [messages]);

  const scrollHandler = (e: React.UIEvent) => {
    let element = e.currentTarget;
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  return (
    <div className={style.chat__message} onScroll={scrollHandler}>
      {messages.map((m) => (
        <Message key={m.id} message={m} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};

export default Messages;
