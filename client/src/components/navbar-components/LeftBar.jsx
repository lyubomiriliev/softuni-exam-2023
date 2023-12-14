import "../../assets/styles/leftBar.scss";
import { Link, useNavigate } from 'react-router-dom';

import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { UserAuth } from "../../contexts/AuthConext";



export default function LeftBar() {

    const navigate = useNavigate();
    const { user, logOut } = UserAuth();


    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="explore">
                        <CollectionsOutlinedIcon />
                        <div className="exploreBtn">
                            <Link to="/explore">
                                <button>Explore</button>
                            </Link>
                        </div>
                    </div>
                    <div className="people">
                        <PeopleAltOutlinedIcon />
                        <div className="peopleBtn">
                            <Link to="/people">
                                <button>People</button>
                            </Link>
                        </div>
                    </div>
                    <div className="saved">
                        <BookmarkBorderOutlinedIcon />
                        <div className="savedBtn">
                            <Link to="/saved">
                                <button>Saved</button>
                            </Link>
                        </div>
                    </div>
                    <div className="createPost">
                        <AddCircleOutlineOutlinedIcon />
                        <div className="createBtn">
                            <Link to="/create">
                                <button>Create Post</button>
                            </Link>
                        </div>
                    </div>
                    <div className="user">
                        <SettingsOutlinedIcon />
                        <div className="settingsBtn">
                            <Link to="/settings">
                                <button>Settings</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}