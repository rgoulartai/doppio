import { useSearchParams, useNavigate } from 'react-router-dom'
import { HeroVideo } from '../components/HeroVideo'

export default function Landing() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isBadgeRef = searchParams.get('ref') === 'badge'

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Badge referral banner — only visible when ?ref=badge */}
      {isBadgeRef && (
        <div
          data-testid="badge-banner"
          className="w-full bg-yellow-400 text-yellow-900 text-sm font-semibold py-3 px-4 text-center"
        >
          🎉 Someone completed Doppio and became an AI Manager! Start your journey →
        </div>
      )}

      {/* Hero section with video */}
      <HeroVideo />

      {/* CTA section */}
      <div className="flex flex-col items-center px-6 py-12 text-center">
        <button
          onClick={() => navigate('/learn')}
          className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 px-8 rounded-2xl active:scale-95 transition-transform shadow-lg"
          style={{ touchAction: 'manipulation' }}
        >
          Start Level 1 →
        </button>

        <p className="mt-6 text-sm text-gray-400 max-w-xs">
          9 curated video lessons. 3 levels. One transformation.
        </p>
      </div>

    </div>
  )
}
