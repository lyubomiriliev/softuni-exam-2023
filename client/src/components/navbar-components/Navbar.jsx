import "../../assets/styles/navBar.scss";
import { Link } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Path from "../../paths";



export default function NavBar() {

    const [user] = useAuthState(auth);

    return (
        <div className="navBar">
            <div className="left">
                <Link to={Path.Home}>
                    <img src="../../src/assets/images/popshot-logo.png" alt="" />
                </Link>
                <div className="homeIcon">
                    <Link to={Path.Home}>
                        <HomeOutlinedIcon />
                    </Link>
                </div>
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder='Search' />
                </div>
            </div>
            <div className="right">
                <div className="notifications">
                    <Link to="/notifications">
                        <NotificationsNoneOutlinedIcon />
                    </Link>
                </div>
                <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                    <PersonOutlineOutlinedIcon />
                </Link>
                <div className="user">
                    {user && (
                        <>
                            <Link to={Path.MyProfile}>
                                <img src={user?.photoURL ?? ""} alt="profilePic" />
                            </Link>
                            <span>{user?.displayName}</span>
                        </>
                    )}
                </div>
            </div>
        </div>

    );
}