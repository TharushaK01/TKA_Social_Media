import React from "react";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import like from "../../assets/images/like.png";
import Comment from "../../assets/images/comment.png";
import remove from "../../assets/images/delete.png";

const PostCards = ({ uid, id, logo, name, email, text, image, timestamp }) => {
  return (
    <div className="mb-4">
      <div className="flex flex-col py-4 bg-white rounded-t-3xl shadow-lg">
        <div className="flex items-center pb-4 ml-2">
          <Avatar size="sm" variant="circular" src={logo || avatar} alt="avatar" />
          <div className="flex flex-col">
            <p className="ml-4 py-2 font-roboto font-medium text-sm text-gray-700">{email}</p>
            <p className="ml-4 font-roboto font-medium text-sm text-gray-700">Published: {timestamp}</p>
          </div>
        </div>
        <div className="px-4">
          {text && <p className="pb-4 font-roboto text-sm text-gray-700">{text}</p>}
          {image && <img className="h-[500px] w-full object-cover rounded-md" src={image} alt="postImage" />}
        </div>
        <div className="flex justify-around items-center pt-4">
          <button className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100">
            <img className="h-8 mr-2" src={like} alt="like" />
          </button>
          <div className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100">
            <img className="h-8 mr-4" src={Comment} alt="comment" />
            <p className="font-roboto text-md text-gray-700">Comments</p>
          </div>
          <div className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100">
            <img className="h-8 mr-4" src={remove} alt="delete" />
            <p className="font-roboto text-md text-gray-700">Remove</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCards;
