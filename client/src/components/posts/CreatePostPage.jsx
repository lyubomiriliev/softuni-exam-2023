import "../../assets/styles/CreatePostPage.scss";
import { useForm } from 'react-hook-form';
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"

import { addDoc, arrayUnion, collection, updateDoc } from 'firebase/firestore'
import { auth, db, storage } from "../../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadString } from 'firebase/storage';

import NavBar from '../navbar-components/NavBar';
import LeftBar from '../navbar-components/LeftBar';
import { UserAuth } from '../../contexts/AuthConext';
import moment from "moment";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import usePreviewImage from "../../hooks/usePreviewImage";
import CloseIcon from '@mui/icons-material/Close';
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import Path from "../../paths";


export default function CreatePostPage() {

    const navigate = useNavigate();
    const { user } = UserAuth();
    const [image, setImage] = useState(null);

    const postsRef = collection(db, "posts")
    const storage = getStorage();


    const handleImgChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const uploadImage = async (ref) => {
        await uploadBytes(ref, image);
    };

    const getImageUrl = async (ref) => {
        return await getDownloadURL(ref);
    };


    const onCreatePost = async (data) => {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadImage(imageRef);
        const imageUrl = await getImageUrl(imageRef);

        await addDoc(postsRef, {
            ...data,
            imageUrl,
            username: user?.displayName,
            authorAvatar: user.photoURL,
            userId: auth?.currentUser?.uid,
            timestamp: moment().format(),
        });

        navigate(Path.Home);
    };

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        content: yup.string().required("You must add contents."),
    });

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    })

    const [title, setTitle] = useState('');

    const imgRef = useRef(null)

    const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImage();

    const { handleCreatePost } = useCreatePost();

    const handlePostCreation = async () => {
        try {
            await handleCreatePost(selectedFile, title);
            navigate(Path.Home)
        } catch (error) {
            alert("Post unsuccessfull")
        }
    }


    return (
        <div className='create-main'>
            <NavBar />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <div className="formWrapper" style={{ flex: 6 }}>
                    <img src="../../src/assets/images/popshot-logo.png" alt="logo" />

                    <form onSubmit={handleSubmit(onCreatePost)}>
                        <div className="title">
                            <h3>Create a new post</h3>
                            <input type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} {...register("title")} />
                            <p style={{ color: "red", fontSize: "13px", marginTop: "0px" }}> {errors.title?.message} </p>
                        </div>
                        <div className="contents">
                            <textarea placeholder='Post description...' {...register("content")} />
                            <p style={{ color: "red", fontSize: "13px", marginTop: "0px" }}> {errors.content?.message} </p>
                            <input type="file" hidden ref={imgRef} onChange={handleImageChange} />
                            <button onClick={() => imgRef.current.click()}><AddAPhotoIcon /></button>
                            {selectedFile && (
                                <div className="imagePreview" >
                                    <img src={selectedFile} alt="postImage" />,
                                    <button onClick={() => { setSelectedFile("") }}><CloseIcon /></button>
                                </div>

                            )}
                            <div className="submit">
                                <button onClick={handlePostCreation} >Submit</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    );
}

function useCreatePost() {
    const authUser = useAuthStore((state) => state.user);
    const createPost = usePostStore(state => state.createPost)
    const addPost = useUserProfileStore(state => state.addPost)
    const { pathname } = useLocation()

    const handleCreatePost = async (selectedFile, title) => {
        if (!selectedFile)
            alert("Please select an image.")

        const newPost = {
            title: title,
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: authUser.uid,
        }

        try {
            const postDocRef = await addDoc(collection(db, "posts"), newPost);
            const userDocRef = doc(db, "users", authUser.uid);
            const postImageRef = ref(storage, `posts/${postDocRef.id}`)

            await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
            await uploadString(postImageRef, selectedFile, "data_url");
            await updateDoc(postDocRef, { imageURL: downLoadURL });
            const downLoadURL = await getDownloadURL(postImageRef);


            newPost.imageURL = downLoadURL;

            createPost({ ...newPost, id: postDocRef.id });
            addPost({ ...newPost, id: postDocRef.id })

            alert("Post created successfully")

        } catch (error) {
            alert("Error")
        }
    }

    return { handleCreatePost }
}