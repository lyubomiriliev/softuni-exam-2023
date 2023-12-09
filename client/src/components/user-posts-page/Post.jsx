import "../../assets/styles/singlePost.scss";

import { useState } from "react";
import { Link } from "react-router-dom";

import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


export default function Post({ post }) {
    const [commentToggle, setCommentToggle] = useState(false);

    const commentToggleHandler = () => {
        setCommentToggle(!commentToggle)

    }

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className="name">{post.name}</span>
                            </Link>
                            <span className="date">Just posted</span>
                        </div>
                    </div>
                    <div>
                        <MoreHorizOutlinedIcon />
                    </div>
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={post.profilePic} alt="" />
                </div>
                <div className="info">
                    <div className="item">
                        {<FavoriteBorderOutlinedIcon />}
                        <span>12 likes</span>
                    </div>
                    <div className="item" onClick={commentToggleHandler}>
                        <AddCommentOutlinedIcon />
                        <span>7 comments</span>
                    </div>
                    <div className="item">
                        <EditOutlinedIcon />
                        <span>Edit</span>
                    </div>
                </div>
            </div>
        </div>
    );
}