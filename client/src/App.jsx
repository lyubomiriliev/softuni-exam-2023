import { Routes, Route } from 'react-router-dom';
import AuthGuard from './components/guards/AuthGuard';
import Path from './paths';

import HomePage from './components/home-page/HomePage';
import PeoplePage from './components/people-page/PeoplePage';
import MyProfile from './components/profile-pages/MyProfile';
import CreatePostPage from './components/posts/CreatePostPage';
import ExplorePage from './components/explore-page/ExplorePage';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import NotFound from '../src/components/404/NotFound';



function App() {



    return (
        <div className='bg'>
            <Routes>
                {/* public routes */}
                <Route path={Path.Login} element={<Login />} />
                <Route path={Path.Register} element={<Register />} />
                {/* private routes */}
                <Route path={Path.Home} element={<AuthGuard><HomePage /></AuthGuard>} />
                <Route path={Path.CreatePost} element={<AuthGuard><CreatePostPage /></AuthGuard>} />
                <Route path={Path.MyProfile} element={<AuthGuard><MyProfile /></AuthGuard>} />
                <Route path={Path.Explore} element={<AuthGuard><ExplorePage /></AuthGuard>} />
                <Route path={Path.People} element={<AuthGuard><PeoplePage /></AuthGuard>} />
                <Route path={Path.NotFound} element={<NotFound />} />
            </Routes>
        </div >
    );
}

export default App