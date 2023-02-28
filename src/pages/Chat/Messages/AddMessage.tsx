import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../../redux/chat-reducer';
import { AppStateType, DispatchType } from '../../../redux/redux-store';
import style from '../ChatPage.module.css';

const AddMessageForm: React.FC<{}> = ({}) => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch<DispatchType>();
  const status = useSelector((state: AppStateType) => state.chat.status);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage('');
  };

  return (
    <div className={style.chat__addMessageForm}>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
      <button
        className="button button-addmessage"
        disabled={status !== 'ready'}
        onClick={sendMessageHandler}>
        Send
      </button>
    </div>
  );
};

export default AddMessageForm;
