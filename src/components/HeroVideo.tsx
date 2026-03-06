export function HeroVideo() {
  return (
    <div className="relative w-full h-[58vh] min-h-[340px] bg-[#1d1d1f] overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        aria-hidden="true"
      >
        {/* Replace with Nano Banana teaser when ready */}
        <source src="/teaser-placeholder.mp4" type="video/mp4" />
        <source src="/teaser-placeholder.webm" type="video/webm" />
      </video>

      {/* Gradient overlay — bottom fade to white so it blends into the page */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#f5f5f7]" />

      {/* Hero text */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center pb-8">
        <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-pill px-4 py-1.5 mb-5">
          <span className="text-white/80 text-[13px] font-medium tracking-tight">
            20 min transformation
          </span>
        </div>

        <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-bold text-white leading-[1.1] tracking-tighter mb-4 max-w-xl">
          From ChatGPT user<br />to AI manager
        </h1>

        <p className="text-[17px] text-white/70 font-normal max-w-sm leading-relaxed">
          No coding. No prompting. Just the way you already talk.
        </p>
      </div>
    </div>
  )
}
