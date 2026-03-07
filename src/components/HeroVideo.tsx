export function HeroVideo() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#0a1929', minHeight: '68vh' }}
    >
      {/* Animated gradient orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Grain texture */}
      <div className="hero-grain" />

      {/* Background video (teaser — replace with Nano Banana) */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.08 }}
        aria-hidden="true"
      >
        <source src="/teaser-placeholder.mp4" type="video/mp4" />
        <source src="/teaser-placeholder.webm" type="video/webm" />
      </video>

      {/* Content */}
      <div
        className="relative flex flex-col justify-center px-7 pt-14 pb-10 max-w-lg mx-auto"
        style={{ minHeight: '68vh', zIndex: 10 }}
      >
        {/* Badge */}
        <div className="hero-badge">
          <span className="hero-badge-pulse" />
          Daily AI Wins
        </div>

        {/* Headline */}
        <div>
          <div className="hero-hl-lost">
            <span style={{ fontSize: '0.32em', fontWeight: 600, letterSpacing: '0.12em', opacity: 0.6, textTransform: 'uppercase', marginBottom: '0.15em', display: 'block', fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'rgba(255,255,255,0.7)' }}>from</span>
            LOST
          </div>
          <div className="hero-hl-arrow">to</div>
          <div className="hero-hl-boss">AI BOSS</div>
          <div className="hero-hl-sub">in 20 Minutes Flat</div>
        </div>

        {/* Quote */}
        <blockquote className="hero-quote">
          <p>"Success is the sum of small efforts,<br />repeated day in and day out."</p>
          <cite>— Robert Collier</cite>
        </blockquote>
      </div>
    </div>
  )
}
