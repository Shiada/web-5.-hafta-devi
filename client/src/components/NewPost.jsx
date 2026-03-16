import { useState } from 'react';
import api from '../services/api';

export default function NewPost({ onPost, onCancel }) {
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        try {
            const res = await api.post('/posts', { content, imageUrl: imageUrl || null });
            onPost(res.data.post);
            setContent('');
            setImageUrl('');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl">
            <div className="p-8 pb-6 flex items-center justify-between border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">Create New Post</h2>
                <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Caption</label>
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="What's on your mind?..."
                            maxLength={500}
                            rows={4}
                            className="w-full resize-none rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-600 p-4 transition-all text-gray-800 outline-none"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Image URL (Optional)</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full rounded-2xl bg-gray-100/50 border-none focus:ring-2 focus:ring-indigo-600 px-4 py-3 transition-all outline-none"
                        />
                        <p className="text-[10px] text-gray-400 ml-1">Tip: Use an Unsplash link for a better look</p>
                    </div>

                    {imageUrl && (
                        <div className="rounded-2xl overflow-hidden aspect-video border-2 border-dashed border-gray-200">
                            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
                
                <div className="flex items-center justify-between mt-10">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${content.length > 450 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                        {content.length}/500 Characters
                    </span>
                    <div className="flex gap-4">
                        <button 
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-3 rounded-full font-bold text-gray-500 hover:text-gray-700 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={loading || !content.trim()}
                            className="btn-gradient min-w-[120px]"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2 justify-center">
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Posting
                                </span>
                            ) : 'Share Post'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
