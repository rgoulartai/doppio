export function HeroVideo() {
  return (
    <div className="relative w-full h-[58vh] min-h-[340px] overflow-hidden" style={{ backgroundColor: '#1c2f3e' }}>
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        aria-hidden="true"
      >
        {/* Replace with Nano Banana teaser when ready */}
        <source src="/teaser-placeholder.mp4" type="video/mp4" />
        <source src="/teaser-placeholder.webm" type="video/webm" />
      </video>

      {/* Flat dark overlay for text contrast — no gradient */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(28,47,62,0.65)' }} />

      {/* Hero text */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-pill px-4 py-1.5 mb-5">
          <span className="text-white/80 text-[13px] font-medium tracking-tight">
            Bite Size daily AI knowledge
          </span>
        </div>

        <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-bold text-white leading-[1.1] tracking-tighter mb-4 max-w-xl">
          Go from LOST<br />to IN CONTROL
        </h1>

        <p className="text-[17px] text-white/70 font-normal max-w-sm leading-relaxed italic">
          "One small step for men, a huge leap for mankind" — Neil Armstrong
        </p>
      </div>
    </div>
  )
}
