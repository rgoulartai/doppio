import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { track } from '../lib/analytics';
import { ResourceLinks } from '../components/ResourceLinks';

const SHARE_URL = 'https://doppio.kookyos.com/?ref=badge';

export default function Complete() {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
    });

    const timer = setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
      });
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    void track('level_completed', { level: 3 });
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: "I'm now an AI Manager!",
      text: "I just completed Doppio — the Duolingo of AI. Start your daily AI practice:",
      url: SHARE_URL,
    };
    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast.success('Link copied! Share your badge 🎉');
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        await navigator.clipboard.writeText(SHARE_URL).catch(() => {});
        toast.success('Link copied! Share your badge 🎉');
      }
    }

    void track('badge_shared', { method: 'share' });
  };

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <div className="flex flex-col items-center px-6 pt-16 pb-12">

        <div className="w-full max-w-sm flex items-center justify-between mb-12">
          <Link to="/" className="font-bold text-lg tracking-tight text-gray-900">
            Doppio
          </Link>
        </div>

        <div className="text-8xl mb-6 animate-bounce" role="img" aria-label="Trophy">
          🏆
        </div>

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-3">
          You're an AI Manager! 🎉
        </h1>

        <p className="text-lg text-gray-500 text-center mb-10 max-w-xs">
          You just transformed how you work. Forever.
        </p>

        <button
          onClick={handleShare}
          className="w-full max-w-sm bg-blue-600 text-white text-lg font-semibold
            py-4 rounded-2xl mb-4 active:scale-95 transition-transform"
          style={{ touchAction: 'manipulation' }}
        >
          Share My Badge
        </button>

        <Link
          to="/learn"
          className="text-sm text-gray-400 hover:text-gray-600 underline mb-2"
        >
          Review the levels
        </Link>

        <ResourceLinks />

      </div>

      <div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
    </div>
  );
}
