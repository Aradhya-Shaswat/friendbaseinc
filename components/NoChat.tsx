import React from 'react';
import { MdOutlineChatBubble } from 'react-icons/md';


const NoChat = () => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8xl'>
        <MdOutlineChatBubble />
      </p>
      <p className='text-2xl text-center'>No Chats yet! Add one and Boom!</p>
    </div>
  );
};

export default NoChat;
