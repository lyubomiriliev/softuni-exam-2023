import "../../assets/styles/singlePost.scss";


import { Link } from "react-router-dom";

import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import useAuthStore from "../../store/authStore";
import useUserProfileStore from "../../store/userProfileStore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../config/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";
import Comments from "../comments/Comments";
import usePostComment from "../../hooks/usePostComment";
import { useState } from "react";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';



export default function ProfilePost({ post }) {

    const authUser = useAuthStore((state) => state.user);
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const deletePost = usePostStore((state) => state.deletePost);
    const decrementPostsCount = useUserProfileStore((state) => state.deletePost)
    const { handlePostComment } = usePostComment()


    const handleDeletePost = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            const imageRef = ref(storage, `posts/${post.id}`);
            await deleteObject(imageRef)
            const userRef = doc(db, "users", authUser.uid);
            await deleteDoc(doc(db, "posts", post.id))
            await updateDoc(userRef, {
                posts: arrayRemove(post.id)
            })

            deletePost(post.id)
            decrementPostsCount(post.id)
            alert("Post deleted successfully");

        } catch (error) {
            console.log(error)
        }
    }

    const [comment, setComment] = useState('');

    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment)
        setComment("")
    }

    return (
        <div className="single-post">
            <div className="postContainer">
                <div className="userPostInfo">
                    <img src={userProfile.profilePicURL} alt="profilePic" className="postThumbnail" />
                    <div className="details">
                        <Link to={`/${userProfile.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <span className="name">{userProfile.fullName}</span>
                        </Link>
                    </div>

                    {authUser?.uid === userProfile.uid && (
                        <div className="deleteBtn">
                            <button onClick={handleDeletePost}><CloseIcon /></button>
                        </div>
                    )}
                </div>
                <div className="datePosted">
                    <span className="date">{post.createdAt}</span>
                </div>
                <div className="title">
                    <h2>{post.title}</h2>
                </div>
                <div className="content">
                    <p>{post.content}</p>
                </div>
                <div className="image">
                    <img src={post.imageURL} alt="" />
                </div>

                <div className="info">
                    <div className="actionBtn">
                        <button>Likes:{post.likes.length}</button>
                    </div>
                    <div className="actionBtn">
                        <button><EditOutlinedIcon />Edit</button>
                    </div>
                    <div className="actionBtn">
                        <button ><BookmarkBorderOutlinedIcon />Save</button>
                    </div>
                    <div className="actionBtn">
                        <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
                        <button onClick={handleSubmitComment} ><SendOutlinedIcon /></button>
                        {post.comments.map(comment => (
                            <Comments key={comment.id} comment={comment} />
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}