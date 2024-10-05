import React from "react";



import live from "../../assets/images/live.jpg";
import feeling from "../../assets/images/feeling.jpg";
import addImage from "../../assets/images/addImage.jpg";

{/*import { Avatar } from "@material-tailwind/react";*/}
{/* import { Button } from "@material-tailwind/react"; */}


const Main = () => {
  return (
    <div className="flex flex-col items-center">
        <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
            <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
               {/*  <Avatar
                size="sm"
                variant="circular"
                src="../../assets/images/avatar.jpg"
                alt="avatar"
                ></Avatar>*/}
                <form className="w-full">
                    <div className="flex justify-between items-center">
                        <div className="w-full ml-4">
                            <input
                            type="text"
                            name="text"
                            placeholder="Whats on your mind User"
                            className="outline-none w-full bg-white rounded-md">
                            </input>
                        </div>
                        <div className="mx-4">{/* Previous Image */}</div>
                       {/*  <div className="mr-4">
                            <Button variant="text" type="submit">
                                Share</Button>
                        </div> */}
                    </div>
                </form>
            </div>
            <span>{/* ProgressBar */}</span>
            <div className="flex justify-around items-center pt-4">
                <div className="flex itmes-center">
                    <labbel
                    htmlFor="addImage"
                    className="cursor-pointer flex items-center">
                        <img className="h-10 mr-4" src={addImage} alt="addImage"></img>
                        <input
                        id="addImage"
                        type="file"
                        style= {{ display: "none"}}
                        ></input>
                    </labbel>
                    {/* <Button variant="text">Upload<Button>*/}
                </div>
                <div className="flex items-center">
                    <img className="h-10 mr-4" src={live} alt="live"></img>
                    <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                        Live
                    </p>
                </div>
                <div className="flex items-center">
                    <img className="h-10 mr-4" src={feeling} alt="feeling"></img>
                    <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                        Feeling
                    </p>
                </div>
            </div>
        </div>
        <div className="flex flex-col py-4 w-full">{/* posts */}</div>
        <div>
            {/* refference for later */}
        </div>
    </div>
  )
}

export default Main