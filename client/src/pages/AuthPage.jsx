import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
            navigate('/feed');
        } catch (err) {
            setError(err.response?.data?.error || 'Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-6 font-['Outfit'] overflow-hidden relative">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 -left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="w-full max-w-lg glass-card p-12 lg:p-16 z-10 animate-in fade-in zoom-in-95 duration-500 scale-100 lg:scale-100">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-indigo-100 rotate-12">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">MiniSosyal</h1>
                    <p className="text-gray-400 font-medium">{isLogin ? 'Welcome back! Please login.' : 'Connect with friends today.'}</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-8 text-sm font-bold animate-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Ad Soyad</label>
                            <input 
                                type="text" 
                                required 
                                value={name} 
                                onChange={e => setName(e.target.value)}
                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-medium"
                                placeholder="Abhinav Khare"
                            />
                        </div>
                    )}
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                        <input 
                            type="email" 
                            required 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-medium"
                            placeholder="abhinav@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Şifre</label>
                            {isLogin && <a href="#" className="text-xs font-bold text-indigo-600 hover:underline transition">Şifremi Unuttum?</a>}
                        </div>
                        <input 
                            type="password" 
                            required 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-medium"
                            placeholder="••••••••"
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full btn-gradient py-4 text-lg mt-4 shadow-xl shadow-orange-100"
                    >
                        {loading ? (
                             <span className="flex items-center gap-2 justify-center">
                                <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                {isLogin ? 'Signing In...' : 'Joining...'}
                             </span>
                        ) : (isLogin ? 'Login Now' : 'Create Account')}
                    </button>
                </form>

                <div className="mt-12 text-center">
                    <button 
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }} 
                        className="text-gray-400 font-bold hover:text-indigo-600 transition group"
                    >
                        {isLogin ? "Don't have an account?" : "Already member?"} 
                        <span className="text-indigo-600 ml-2 group-hover:underline underline-offset-4">{isLogin ? 'Join the community' : 'Login instead'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
