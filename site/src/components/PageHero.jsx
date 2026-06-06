export default function PageHero({ title, subtitle, eyebrow, bgImage }) {
  return (
    <section
      className="relative flex items-end"
      style={{
        minHeight: '400px',
        paddingTop: '120px',
        paddingBottom: '60px',
        backgroundImage:    bgImage ? `url(${bgImage})` : undefined,
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        backgroundColor:    bgImage ? undefined : '#0f172a',
        animation: 'heroFadeIn 0.7s ease-out',
      }}
    >
      {bgImage && <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.60)' }} />}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">{title}</h1>
        {subtitle && <p className="text-white/70 text-lg mt-3 max-w-xl">{subtitle}</p>}
      </div>
      <style>{`@keyframes heroFadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </section>
  )
}
