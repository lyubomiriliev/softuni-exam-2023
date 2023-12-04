import { db } from '../../config/firebase';
import { collection, getDocs } from "firebase/firestore"



import { useState, useEffect } from 'react';

export default function MyPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchSavedPosts = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'saved-posts'));

                const fetchedPosts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(fetchedPosts);
            } catch (error) {
                console.error('Error fetching saved posts: ', error);
            }
        };

        fetchSavedPosts();
    }, []);


    return (
        <div className='page-container'>
            <div className="saved-posts-container">
                <div className="content">
                </div>
                {posts.map((post) => (
                    <div key={post.id} className="post-card">
                        <img src={post.imageURL} alt={post.title} />
                        <span>{post.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}