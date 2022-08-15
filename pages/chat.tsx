import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { MdOutlineCancel } from 'react-icons/md';

import Comments from '../components/Comments';
import { BASE_URL } from '../utils';
import useAuthStore from '../store/authStore';
import { Video } from '../types';
import axios from 'axios';

interface IProps {
  postDetails: Video;
}

const ChatLLL = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const { userProfile }: any = useAuthStore();

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };


  var time = 1;

  var interval = setInterval(function() { 
    if (time <= 3) { 
       location.reload();
       time++;
    }
    else { 
       clearInterval(interval);
    }
 }, 10000);

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userProfile) {
      if (comment) {
        setIsPostingComment(true);
        const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment,
        });

        setPost({ ...post, comments: res.data.comments });
        setComment('');
        setIsPostingComment(false);

        location.reload();
      }
    }
  };

  return (
    <>
      {post && (
        <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
          <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center'>
            <div className='opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
              <p className='cursor-pointer ' onClick={() => router.back()}>
                <MdOutlineCancel className='text-white text-[35px] hover:opacity-90' />
                
              </p>
            </div>
            <div className='relative'>
              <div className='lg:h-[100vh] h-[60vh]'>
                <video
                  autoPlay
                  ref={videoRef}
                  src={post?.video?.asset.url}
                  className='h-full cursor-pointer'
                ></video>
              </div>
            </div>
            <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer'>
            </div>
          </div>
          <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
            <div className='lg:mt-20 mt-10'>

              <Comments
                comment={comment}
                setComment={setComment}
                addComment={addComment}
                comments={post.comments}
                isPostingComment={isPostingComment}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async ({
  // params: { },
}: {
  params: { ibVpsZ7UUsEMUeiIv7DQyd: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/post/KwYcO2CkzvEYh2UFjinwnI`);

  return {
    props: { postDetails: res.data },
  };
};

export default ChatLLL;