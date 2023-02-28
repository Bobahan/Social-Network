import React from 'react';
import { ChatMessageType } from '../ChatPage';

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
  return (
    <>
      <img style={{ width: '70px' }} src={message.photo} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{message.userName}</div>
        <div style={{ marginLeft: '10px' }}>{message.message}</div>
      </div>
      <hr style={{ width: '95%' }} />
    </>
  );
});

export default Message;
