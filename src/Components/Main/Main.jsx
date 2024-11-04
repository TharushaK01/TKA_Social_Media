import React, { useRef, useContext, useState, useReducer, useEffect } from "react";
import avatar from "../../assets/images/avatar.jpg";
import live from "../../assets/images/Live.png";
import feeling from "../../assets/images/feelings.png";
import addImage from "../../assets/images/addImage.png";
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
    const [state, dispatch] = useReducer(postsReducer, postsStates);
    const { SUBMIT_POST, HANDLE_ERROR } = postActions;

    const handleUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const submitImage = async () => {
        const storage = getStorage();
        const fileType = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg"].includes(file?.type);

        if (!file || !fileType) return;

        try {
            const storageRef = ref(storage, `image/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgressBar(progress);
                },
                (error) => {
                    alert(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setImage(downloadURL);
                }
            );
        } catch (err) {
            dispatch({ type: HANDLE_ERROR });
            alert(err.message);
            console.log(err.message);
        }
    };

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        const uid = user?.uid || userData?.uid;
        const logo = user?.photoURL || userData?.logo;
        const userName = user?.displayName || userData?.name; // Renamed variable
        const email = user?.email || userData?.email;

        if (!uid || (text.current.value === "" && !image)) {
            alert("Please add text or an image to your post.");
            return;
        }

        try {
            await setDoc(doc(collectionRef), {
                uid,
                logo,
                userName, // Updated field name
                email,
                text: text.current.value,
                image,
                timestamp: serverTimestamp(),
            });
            text.current.value = "";
            setImage(null);
            setFile(null);
            setProgressBar(0);
        } catch (err) {
            dispatch({ type: HANDLE_ERROR });
            alert(`Error: ${err.message}`);
            console.log(err.message);
        }
    };

    useEffect(() => {
        const q = query(collectionRef, orderBy("timestamp", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            dispatch({
                type: SUBMIT_POST,
                posts: snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    documentId: doc.id,
                })),
            });

            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: "smooth" });
            }

            setProgressBar(0);
        });

        return () => unsubscribe();
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
                                placeholder={`What's on your mind  ${
                    user?.displayName?.split(" ")[0] ||
                    userData?.name?.charAt(0).toUpperCase() +
                      userData?.name?.slice(1)}`} // Updated variable in placeholder
                                className="outline-none w-full bg-white rounded-md px-2"
                                ref={text}
                            />
                            {image && <img className="h-10 rounded-md" src={image} alt="preview" />}
                            <button className="h-8 font-semibold text-md text-[#0177b7] absolute right-[3%] ml-4" type="submit">
                                Share
                            </button>
                        </div>
                    </form>
                </div>

                <span style={{ width: `${progressBar}%` }} className="bg-blue-700 py-1 rounded-md"></span>

                <div className="flex justify-around items-center pt-4">
                    <label htmlFor="addImage" className="cursor-pointer flex items-center">
                        <img className="h-10 mr-4" src={addImage} alt="add" />
                        <input id="addImage" type="file" style={{ display: "none" }} onChange={handleUpload} />
                    </label>
                    {file && <button onClick={submitImage}>Upload</button>}
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
                    <Alert color="red">Something went wrong. Refresh and try again...</Alert>
                ) : (
                    <div>
                        {state.posts.map((post, index) => (
                            <PostCards key={index} {...post} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;
