import React from 'react';
import { Avatar } from "@material-tailwind/react";
import avatar from '../../assets/images/avatar.jpg';
import like from '../../assets/images/like.png';
import Comment from '../../assets/images/comment.png';
import  remove  from '../../assets/images/delete.png';


const PostCards = ({uid, id, logo, name, email, text, image, timestamp}) => {
  return (
    <div className='mb-4'>
        <div className='flex flex-col py-4 bg-white rounded-t-3xl'>
            <div className='flex items-center pb-4 ml-2'>
                <Avatar size='sm' variant='circular' src={logo || avatar} alt='avatar'></Avatar>
                <div className='flex flex-col'>
                    <p className='ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
                        {email}
                    </p>
                    <p className='ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
                        Published: {timestamp}
                    </p>
                </div>
                {/*Add friend Image */}
            </div>
            <div>
                <p className='ml-4 pb-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
                    {text}</p>
                    {image && (
                        <img className='h-[500px] w-full' src='{image}' alt="postImage"></img>
                    )}
            </div>
            <div className='flex justify-around items-center pt-4'>
                <button className='flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100'>
                    <img className='h-8 mr-' src={like} alt=''></img>
                    {/*<p>display like</p> */}
                </button>
                <div className='flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100'>
                    <div className='flex items-center cursor-pointer'>
                        <img className='h-8 mr-4' src={Comment} alt='comment'></img>
                        <p className='font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>
                            Comments
                        </p>
                    </div>
                </div>
                <div className='flex items-center'>
                    <img className='h-8 mr-4' src={remove} alt='delete'></img>
                    <p className='font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>
                        Delete
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostCards