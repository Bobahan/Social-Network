import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer';
import { AppStateType, DispatchType } from '../../redux/redux-store';
import style from './ChatPage.module.css';
import AddMessageForm from './Messages/AddMessage';
import Messages from './Messages/Messages';

const ChatPage: React.FC = () => {
  const dispatch = useDispatch<DispatchType>();
  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div className={style.chat}>
      {status === 'error' && <div>Some error occured. Please refresh the page</div>}
      <>
        <Messages />
        <AddMessageForm />
      </>
    </div>
  );
};

export default ChatPage;

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
