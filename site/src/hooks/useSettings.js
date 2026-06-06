import { useState, useEffect } from 'react'
import { getSettings } from '../services/api'

const DEFAULTS = {
  site_name:        'AFC Piscinas',
  site_tagline:     'Venha mergulhar connosco',
  contact_phone:    '351 96 733 57 07',
  contact_email:    'geral@afcpiscinas.pt',
  contact_address:  'Aguda Parque - Edificio J, Largo de Arcozelo, 76, 4405-021 Arcozelo, Portugal',
  contact_maps:     'https://maps.app.goo.gl/qF3mxfXTS8EeAK4c7',
  whatsapp_number:  '351967335707',
  social_instagram: '',
  social_facebook:  '',
  social_youtube:   '',
}

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULTS)
  useEffect(() => {
    getSettings()
      .then(data => setSettings({ ...DEFAULTS, ...data }))
      .catch(() => {})
  }, [])
  return settings
}
