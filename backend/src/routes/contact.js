import { Router } from 'express'
import { Resend } from 'resend'
import { pool } from '../db/connection.js'

const router = Router()

// POST /api/contact
router.post('/', async (req, res) => {
  const { nome, email, assunto, mensagem } = req.body ?? {}

  if (!nome || !email || !assunto || !mensagem) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
  }

  // Buscar email destino das settings
  let toEmail = process.env.RESEND_TO_EMAIL || 'geral@afcpiscinas.pt'
  try {
    const { rows } = await pool.query(
      "SELECT value FROM site_settings WHERE key = 'resend_to_email'"
    )
    if (rows[0]?.value) toEmail = rows[0].value
  } catch {}

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from:     'AFC Piscinas <noreply@effectidea.com>',
      to:       [toEmail],
      reply_to: email,
      subject:  `Novo contacto do site - ${assunto}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#00b4d8">Novo contacto do site AFC Piscinas</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;color:#666;width:100px"><strong>Nome:</strong></td><td style="padding:8px">${nome}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px;color:#666"><strong>Email:</strong></td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;color:#666"><strong>Assunto:</strong></td><td style="padding:8px">${assunto}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f5f5f5;border-radius:8px">
            <strong>Mensagem:</strong>
            <p style="margin-top:8px;white-space:pre-wrap">${mensagem}</p>
          </div>
          <hr style="margin-top:24px;border:none;border-top:1px solid #eee"/>
          <p style="color:#999;font-size:12px">Enviado via formulário de contacto em afcpiscinas.pt</p>
        </div>
      `,
    })

    res.json({ success: true, message: 'Mensagem enviada com sucesso!' })
  } catch (err) {
    console.error('[contact] Resend error:', err.message)
    // Mesmo que o email falhe, confirmamos recepção
    res.json({ success: true, message: 'Mensagem recebida. Entraremos em contacto brevemente.' })
  }
})

export default router
