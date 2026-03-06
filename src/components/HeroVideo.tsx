export function HeroVideo() {
  return (
    <div className="relative w-full h-[60vh] min-h-[360px] bg-gray-900 overflow-hidden">
      {/* Background video — drop real file into public/ when ready */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        aria-hidden="true"
      >
        {/* TODO: Replace with real teaser video from Nano Banana */}
        <source src="/teaser-placeholder.mp4" type="video/mp4" />
        <source src="/teaser-placeholder.webm" type="video/webm" />
      </video>

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />

      {/* Hero text content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 max-w-2xl">
          20 minutes from ChatGPT user<br className="hidden sm:block" /> to AI manager
        </h1>
        <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-md">
          No coding. No prompting. Just natural language.
        </p>
      </div>
    </div>
  )
}
