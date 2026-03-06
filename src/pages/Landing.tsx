import { useSearchParams, useNavigate } from 'react-router-dom'
import { HeroVideo } from '../components/HeroVideo'

export default function Landing() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isBadgeRef = searchParams.get('ref') === 'badge'

  return (
    <div className="min-h-screen bg-apple-bg text-apple-text">

      {/* Badge referral banner */}
      {isBadgeRef && (
        <div
          data-testid="badge-banner"
          className="w-full bg-apple-blue text-white text-[13px] font-medium py-2.5 px-4 text-center tracking-tight"
        >
          Someone completed Doppio and became an AI Manager — start your journey
        </div>
      )}

      {/* Hero */}
      <HeroVideo />

      {/* CTA section */}
      <div className="flex flex-col items-center px-6 py-14 text-center stagger-1">
        <button
          onClick={() => navigate('/learn')}
          className="btn-apple-primary w-full max-w-[280px]"
          style={{ touchAction: 'manipulation' }}
        >
          Start Learning
        </button>

        <p className="mt-5 text-[15px] text-apple-secondary max-w-xs leading-relaxed">
          9 curated lessons &middot; 3 levels &middot; 20 minutes
        </p>
      </div>

      {/* Feature pills */}
      <div className="flex justify-center gap-3 px-6 pb-16 flex-wrap stagger-2">
        {['No coding', 'No prompting', 'Just natural language'].map((label) => (
          <span
            key={label}
            className="text-[13px] text-apple-secondary bg-white border border-apple-divider rounded-pill px-4 py-1.5 font-medium"
          >
            {label}
          </span>
        ))}
      </div>

    </div>
  )
}
