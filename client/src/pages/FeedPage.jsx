import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import PostCard from '../components/PostCard';
import NewPost from '../components/NewPost';

export default function FeedPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewPost, setShowNewPost] = useState(false);
    const { user, logout } = useAuth();

    const fetchPosts = async () => {
        try {
            const res = await api.get('/posts');
            setPosts(res.data.posts);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleNewPost = (newPost) => {
        setPosts([newPost, ...posts]);
        setShowNewPost(false);
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#F0F2F5] p-4 lg:p-6 font-['Outfit']">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-80 glass-card p-8 sticky top-6 h-[calc(100vh-48px)]">
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">MiniSosyal</h1>
                </div>

                {user && (
                    <div className="text-center mb-8 px-4">
                        <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full p-1 mb-4">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl font-bold text-indigo-600 border-4 border-white overflow-hidden">
                                {user.avatarUrl ? <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" /> : user.name.charAt(0)}
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                        <p className="text-gray-400 text-sm mb-4">@{user.name.toLowerCase().replace(' ', '_')}</p>
                        
                        <div className="flex justify-around py-4 border-y border-gray-100 mb-6">
                            <div className="text-center">
                                <span className="block font-bold text-gray-800">12</span>
                                <span className="text-xs text-gray-400 uppercase tracking-wider">Posts</span>
                            </div>
                            <div className="text-center">
                                <span className="block font-bold text-gray-800">1.2k</span>
                                <span className="text-xs text-gray-400 uppercase tracking-wider">Followers</span>
                            </div>
                            <div className="text-center">
                                <span className="block font-bold text-gray-800">150</span>
                                <span className="text-xs text-gray-400 uppercase tracking-wider">Following</span>
                            </div>
                        </div>
                    </div>
                )}

                <nav className="flex-1 space-y-1">
                    <a href="#" className="sidebar-link active">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
                        Feed
                    </a>
                    <a href="#" className="sidebar-link">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        Explore
                    </a>
                    <a href="#" className="sidebar-link">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Reels
                    </a>
                    <a href="#" className="sidebar-link">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        Settings
                    </a>
                </nav>

                <button onClick={logout} className="sidebar-link mt-auto text-red-500 hover:bg-red-50 hover:text-red-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col gap-6 lg:ml-8">
                {/* Topbar */}
                <header className="flex items-center justify-between glass-card px-8 h-20 shrink-0">
                    <div className="flex-1 max-w-lg relative group">
                        <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="w-full bg-gray-100/50 border-none rounded-2xl py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none text-sm" 
                        />
                    </div>
                    <div className="flex items-center gap-4 ml-6">
                        <button className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-xl transition relative">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-xl transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        </button>
                        <button onClick={() => setShowNewPost(true)} className="btn-gradient flex items-center gap-2">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                           Create a post
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {/* Stories */}
                    <div className="glass-card p-6 mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Stories</h3>
                        <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar">
                            <div className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer">
                                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center p-0.5 group-hover:border-indigo-600 transition-colors">
                                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-indigo-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold text-gray-500">Your story</span>
                            </div>
                            {[1, 2, 3, 4, 5, 6, 7].map(i => (
                                <div key={i} className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF7E5F] to-[#FEB47B] p-0.5 transition-transform group-hover:scale-105">
                                        <div className="w-full h-full rounded-full bg-white p-0.5">
                                             <img src={`https://i.pravatar.cc/150?u=${i}`} alt="" className="w-full h-full rounded-full object-cover" />
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-gray-500">User_{i}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Feed Grid */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Feed</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {posts.map(post => (
                                <PostCard key={post.id} post={post} currentUser={user} onUpdate={fetchPosts} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Modals */}
                {showNewPost && (
                    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="w-full max-w-xl animate-in zoom-in-95 duration-200">
                            <NewPost onPost={handleNewPost} onCancel={() => setShowNewPost(false)} />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
