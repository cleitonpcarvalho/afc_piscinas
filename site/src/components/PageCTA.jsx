export default function PageCTA({ text, waMsg = 'interesse' }) {
  const url = `https://wa.me/351967335707?text=${waMsg}`
  return (
    <section className="py-16" style={{ background: '#0f172a' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-white text-xl font-semibold mb-6">{text}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-4">
          Pedir Orçamento Gratuito
        </a>
      </div>
    </section>
  )
}
