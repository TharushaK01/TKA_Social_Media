import React, { useRef, useContext, useState, useReducer} from "react";

import avatar from "../../assets/images/avatar.jpg";
import button from "../../assets/images/button.png";

import live from "../../assets/images/live.jpg";
import feeling from "../../assets/images/feeling.jpg";
import addImage from "../../assets/images/addImage.jpg";
import { AuthContext } from "../AppContext/AppContext";
import { doc, setDoc, collection, documentId, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase"; 
import { postsReducer, postActions, postsStates, } from "../AppContext/postReducer";
import { type } from "@testing-library/user-event/dist/type";



{/*import { Avatar } from "@material-tailwind/react";*/}
{/* import { Button } from "@material-tailwind/react"; */}

 
const Main = () => {
   const { user, userData } = useContext(AuthContext);
    const text = useRef("");
    {/* const [image, setImage] = useState(null);
    const collectionRef = collection(db, "posts");
    const postRef = doc (collection(db, "posts"));
    const document = postRef.id;
    const [state, dispatch] = useReducer(postsReducer, postsStates);
    const [SUBMIT_POST, HANDLE_ERROR] = postActions;

     const handleSubmitPost = async (e) => {
        try {
            if(text.current.value !=="") {
                await setDoc(postRef, {
                    documentId: document,
                    uid: user?.uid || userData?.uid,
                    logo: user?.photoURL,
                    name: user?.displayName || userData?.name,
                    email: user?.email || userData?.email,
                    text: text.current.value,
                    image: image,
                    timestamp: serverTimestamp(),
                });
                text.current.value = "";
            } else {
                dispatch({type: HANDLE_ERROR});
            }

        } catch (err) {
            dispatch({type: HANDLE_ERROR});
            alert(err.message);
            console.log(err.message);
        }
    };*/}


  return (
    <div className="flex flex-col items-center">
        <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
            <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
            <img className="h-10 mr-4" size="sm" src={avatar} alt="avatar"></img>
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
                        placeholder={`What's on your mind ${
                        user?.displayName?.split(" ")[0] || (userData?.name ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1) : "")
                        }`}
                        className="outline-none w-full bg-white rounded-md"
                        ref={text}
                        />

                            {/* ()  */}
                        </div>
                        <div className="mx-4">{/* Previous Image */}</div>
                        <div className="mr-4">
                        <button className="h-10 mr-4 font-bold text-md text-[#0177b7]"  size="sm">Share</button>
                        </div>
                        
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