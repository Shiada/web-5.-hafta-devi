import { useState } from 'react';
import api from '../services/api';

export default function PostCard({ post, currentUser, onUpdate }) {
    const [comment, setComment] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [isLiking, setIsLiking] = useState(false);

    const isLiked = currentUser && post.likes?.some(l => l.userId === currentUser.id);

    const handleLike = async () => {
        if (!currentUser || isLiking) return;
        setIsLiking(true);
        try {
            await api.post(`/posts/${post.id}/like`);
            onUpdate();
        } catch (err) {
            console.error(err);
        } finally {
            setIsLiking(false);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!comment.trim() || !currentUser) return;
        
        try {
            await api.post(`/posts/${post.id}/comments`, { text: comment });
            setComment('');
            onUpdate();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('This post will be deleted. Continue?')) return;
        try {
            await api.delete(`/posts/${post.id}`);
            onUpdate();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="glass-card overflow-hidden flex flex-col group animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Post Header */}
            <div className="flex items-center justify-between p-5 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border-2 border-indigo-100 overflow-hidden">
                         {post.author.avatarUrl ? <img src={post.author.avatarUrl} alt="" className="w-full h-full object-cover" /> : post.author.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 leading-tight">{post.author.name}</h4>
                        <span className="text-xs text-gray-400 font-medium">Istanbul, TR</span>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    {currentUser?.id === post.authorId && (
                        <button onClick={handleDelete} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    )}
                    <button className="text-gray-300 hover:text-gray-600 transition-colors p-1">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </button>
                </div>
            </div>

            {/* Post Media/Content */}
            <div className="px-5">
                <div className={`rounded-3xl overflow-hidden relative aspect-square bg-[#F8FAFC] flex items-center justify-center border border-gray-100 ${post.imageUrl ? '' : 'bg-gradient-to-br from-indigo-50 to-purple-50'}`}>
                    {post.imageUrl ? (
                        <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <p className="px-6 text-center text-gray-700 font-medium leading-relaxed italic line-clamp-6">
                            "{post.content}"
                        </p>
                    )}
                </div>
            </div>

            {/* Actions Row */}
            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={handleLike} 
                            disabled={isLiking}
                            className={`flex items-center gap-1.5 transition-all text-sm font-bold ${isLiked ? 'text-rose-500 drop-shadow-sm scale-110' : 'text-[#1A1D23] hover:text-rose-500'}`}
                        >
                            <svg className="w-6 h-6" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => setShowComments(!showComments)}
                            className="flex items-center gap-1.5 text-[#1A1D23] hover:text-indigo-600 font-bold text-sm transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        </button>
                        <button className="text-[#1A1D23] hover:text-green-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                        </button>
                    </div>
                    <button className="text-[#1A1D23] hover:text-amber-500 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                    </button>
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <div className="flex -space-x-2">
                         {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/50?u=${i+10}`} className="w-5 h-5 rounded-full border border-white" />)}
                    </div>
                    <p className="text-xs font-semibold text-gray-700">
                        Liked by <span className="text-gray-900">User_X</span> and <span className="text-gray-900">{post._count.likes} others</span>
                    </p>
                </div>

                {post.imageUrl && (
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        <span className="font-bold text-gray-900 mr-2">{post.author.name}</span>
                        {post.content}
                    </p>
                )}

                {showComments && (
                    <div className="mt-4 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
                        <div className="max-h-40 overflow-y-auto mb-4 custom-scrollbar pr-2 space-y-3">
                            {post.comments.length > 0 ? post.comments.map(c => (
                                <div key={c.id} className="text-sm">
                                    <span className="font-bold text-gray-900 mr-2">{c.author.name}</span>
                                    <span className="text-gray-600">{c.text}</span>
                                </div>
                            )) : (
                                <p className="text-xs text-gray-400 italic">No comments yet. Be the first!</p>
                            )}
                        </div>
                        {currentUser && (
                            <form onSubmit={handleComment} className="relative group">
                                <input
                                    type="text"
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="w-full bg-gray-50 border-none rounded-xl py-2 px-4 pr-12 text-sm focus:ring-1 focus:ring-indigo-600 outline-none transition-all placeholder:text-gray-400"
                                />
                                <button type="submit" disabled={!comment.trim()} className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600 font-bold text-xs disabled:opacity-0 transition-opacity">
                                    Post
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
