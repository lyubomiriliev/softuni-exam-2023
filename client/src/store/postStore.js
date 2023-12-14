import { create } from 'zustand'

const usePostStore = create((set) => ({
    posts: [],
    createPost: (post) => set(state => ({ posts: [post, ...state.posts] }))
    // del post
    // add comment
    // setPosts
}))

export default usePostStore;


