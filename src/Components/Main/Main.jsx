import React, { useRef, useContext, useState, useReducer, useEffect } from "react";
import avatar from "../../assets/images/avatar.jpg";
import live from "../../assets/images/live.jpg";
import feeling from "../../assets/images/feeling.jpg";
import addImage from "../../assets/images/addImage.jpg";
import { AuthContext } from "../AppContext/AppContext";
import { doc, setDoc, collection, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase"; 
import { postsReducer, postActions, postsStates } from "../AppContext/postReducer";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Alert } from "@material-tailwind/react";
import PostCards from "./PostCards";

const Main = () => {
    const { user, userData } = useContext(AuthContext);
    const text = useRef("");
    const scrollRef = useRef(null);
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [progressBar, setProgressBar] = useState(0);

    const collectionRef = collection(db, "posts");
    const postRef = doc(collection(db, "posts"));
    const document = postRef.id;

    const [state, dispatch] = useReducer(postsReducer, postsStates);
    const { SUBMIT_POST, HANDLE_ERROR } = postActions;

    const handleUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmitPost = async (e) => {
        e.preventDefault();

           // Check if `user` or `userData` is defined and contains `uid`
    const uid = user?.uid || userData?.uid;
    const logo = user?.photoURL || userData?.logo;
    const name = user?.displayName || userData?.name;
    const email = user?.email || userData?.email;

    if (!uid) {
        alert("User not authenticated. Please log in.");
        return;
    }


        if (text.current.value !== "") {
            try {
                await setDoc(postRef, {
                    uid: uid, // Ensures uid is defined
                    logo: logo,
                    name: name,
                    email: email,
                    text: text.current.value,
                    image: image,
                    timestamp: serverTimestamp(),
                });
                text.current.value = "";
                setImage(null); // Reset image after successful upload
            } catch (err) {
                dispatch({ type: HANDLE_ERROR });
                alert(`Error: ${err.message}`);
                console.log(err.message);
            }
        } else {
            dispatch({ type: HANDLE_ERROR });
            alert("Text field cannot be empty.");
        }
    };

    const submitImage = async () => {
        const storage = getStorage();
        const fileType = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg"].includes(file?.type);

        if (!file || !fileType) return;

        try {
            const storageRef = ref(storage, `image/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgressBar(progress);
            }, 
            (error) => {
                alert(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setImage(downloadURL);
            });
        } catch (err) {
            dispatch({ type: HANDLE_ERROR });
            alert(err.message);
            console.log(err.message);
        }
    };

    useEffect(() => {
        const postData = async () => {
            const q = query(collectionRef, orderBy("timestamp", "asc"));
            await onSnapshot(q, (snapshot) => {
                dispatch({
                    type: SUBMIT_POST,
                    posts: snapshot.docs.map((doc) => doc.data()),
                });

                if (scrollRef.current && typeof scrollRef.current.scrollIntoView === "function") {
                    scrollRef.current.scrollIntoView({ behavior: "smooth" });
                }

                setImage(null);
                setFile(null);
                setProgressBar(0);
            });
        };

        return () => postData();
    }, [SUBMIT_POST]);

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
                <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
                    <img className="h-10 mr-4" src={avatar} alt="avatar" />

                       <form className="w-full relative pl-2" onSubmit={handleSubmitPost}>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                name="text"
                                placeholder={`What's on your mind ${
                                    user?.displayName?.split(" ")[0] || userData?.name || ""
                                }?`}
                                className="outline-none w-full bg-white rounded-md px-2" 
                                ref={text}
                            />
                            {image && (
                                <img className="h-10 rounded-md" src={image} alt="previewImage" />
                            )}
                            <button 
                                className="h-8 font-semibold text-md text-[#0177b7] absolute right-[3%] ml-4" 
                                type="submit"
                            >
                                Share
                            </button>
                        </div>
                    </form>
                </div>

                <span style={{ width: `${progressBar}%` }} className="bg-blue-700 py-1 rounded-md"></span>

                <div className="flex justify-around items-center pt-4">
                    <label htmlFor="addImage" className="cursor-pointer flex items-center">
                        <img className="h-10 mr-4" src={addImage} alt="addImage" />
                        <input id="addImage" type="file" style={{ display: "none" }} onChange={handleUpload} />
                    </label>
                    {file && (<button variant="text" onClick={submitImage}>Upload</button>)}

                    <div className="flex items-center">
                        <img className="h-10 mr-4" src={live} alt="live" />
                        <p className="font-roboto font-medium text-md text-gray-700">Live</p>
                    </div>

                    <div className="flex items-center">
                        <img className="h-10 mr-4" src={feeling} alt="feeling" />
                        <p className="font-roboto font-medium text-md text-gray-700">Feeling</p>
                    </div>
                </div>
            </div>

            <div ref={scrollRef} className="flex flex-col py-4 w-full">
                {state.error ? (
                    <div className="flex justify-center items-center">
                        <Alert color="red">
                            Something went wrong refresh and try again...
                        </Alert>
                    </div>
                ) : (
                    <div>
                        {state.posts.length > 0 &&
                        state?.posts?.map((post, index) =>{
                            return(
                                <PostCards
                                    key={index}
                                    logo={post.logo}
                                    id={post.documentId}
                                    uid={post?.uid}
                                    name={post.name}
                                    email={post.email}
                                    image={post.image}
                                    text={post.text}
                                    timestamp={post.timestamp ? new Date(post.timestamp.toDate()).toUTCString() : ''}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;
