import React from 'react';
import { MdOutlineChatBubble } from 'react-icons/md';

interface IProps {
  text: string;
}

const NoChat = ({ text }: IProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8xl'>
        <MdOutlineChatBubble />
      </p>
      <p className='text-2xl text-center'>{text}</p>
    </div>
  );
};

export default NoChat;
