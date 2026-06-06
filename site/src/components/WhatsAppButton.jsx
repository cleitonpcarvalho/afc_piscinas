const WA_URL = 'https://wa.me/351967335707?text=Ol%C3%A1%2C+vim+pelo+site+e+gostaria+de+mais+informa%C3%A7%C3%B5es'

export default function WhatsAppButton() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar via WhatsApp"
      style={{
        position:  'fixed',
        bottom:    '24px',
        right:     '24px',
        zIndex:    100,
        width:     '56px',
        height:    '56px',
        borderRadius: '50%',
        background: '#25d366',
        display:   'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 12px rgba(37,211,102,0.5), 0 4px 12px rgba(0,0,0,0.3)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.1)'
        e.currentTarget.style.boxShadow = '0 0 20px rgba(37,211,102,0.7), 0 4px 16px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 0 12px rgba(37,211,102,0.5), 0 4px 12px rgba(0,0,0,0.3)'
      }}
    >
      {/* SVG inline do WhatsApp — exclusivo para este botão */}
      <svg width="30" height="30" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.483.683 4.808 1.872 6.8L2 30l7.41-1.848A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 01-5.888-1.608l-.422-.252-4.4 1.096 1.116-4.28-.276-.44A11.544 11.544 0 014.4 16C4.4 9.592 9.592 4.4 16 4.4S27.6 9.592 27.6 16 22.408 27.6 16 27.6zm6.332-8.664c-.348-.176-2.056-1.016-2.376-1.132-.32-.112-.552-.172-.784.172-.232.344-.9 1.132-1.104 1.368-.2.232-.404.26-.752.084-.348-.176-1.468-.54-2.796-1.724-1.032-.92-1.728-2.056-1.932-2.404-.2-.344-.02-.532.152-.704.156-.156.348-.404.52-.608.176-.2.232-.344.348-.576.116-.232.06-.436-.028-.612-.088-.172-.784-1.888-1.076-2.584-.284-.68-.572-.588-.784-.6-.2-.008-.432-.012-.664-.012s-.608.088-.924.432c-.32.348-1.208 1.18-1.208 2.876s1.236 3.336 1.408 3.568c.172.228 2.432 3.712 5.892 5.208.824.356 1.468.568 1.968.728.828.264 1.58.228 2.176.14.664-.1 2.056-.84 2.348-1.652.292-.812.292-1.508.204-1.652-.084-.148-.316-.232-.664-.408z"/>
      </svg>
    </a>
  )
}
