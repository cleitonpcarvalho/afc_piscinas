import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import api from '../services/api'

const GROUP_LABELS = {
  contact: 'Contacto',
  email:   'Email',
  social:  'Redes Sociais',
}

const TYPE_ORDER = ['contact', 'email', 'social']

export default function Settings() {
  const [grouped, setGrouped] = useState({})
  const [values,  setValues]  = useState({})
  const [saving,  setSaving]  = useState(false)
  const [msg,     setMsg]     = useState('')

  useEffect(() => {
    api.get('/api/settings/grouped').then(r => {
      setGrouped(r.data)
      const flat = {}
      for (const items of Object.values(r.data)) {
        for (const item of items) flat[item.key] = item.value
      }
      setValues(flat)
    })
  }, [])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await api.put('/api/settings', values)
      setMsg('Configurações guardadas!')
    } catch {
      setMsg('Erro ao guardar')
    } finally {
      setSaving(false)
      setTimeout(() => setMsg(''), 4000)
    }
  }

  const groups = TYPE_ORDER.filter(g => grouped[g])

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
      {groups.map(group => (
        <div key={group} className="card space-y-4">
          <h2 className="text-text font-semibold text-sm pb-2 border-b border-border">
            {GROUP_LABELS[group] || group}
          </h2>
          {(grouped[group] || []).map(item => (
            <div key={item.key}>
              <label className="block text-muted text-xs font-medium mb-1.5">
                {item.label}
              </label>
              {item.type === 'textarea' ? (
                <textarea
                  className="input resize-y"
                  rows={3}
                  value={values[item.key] ?? ''}
                  onChange={e => setValues(v => ({ ...v, [item.key]: e.target.value }))}
                />
              ) : (
                <input
                  type="text"
                  className="input"
                  value={values[item.key] ?? ''}
                  onChange={e => setValues(v => ({ ...v, [item.key]: e.target.value }))}
                />
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
          <Save size={14} /> {saving ? 'A guardar…' : 'Guardar Configurações'}
        </button>
        {msg && <span className="text-sm text-accent">{msg}</span>}
      </div>
    </form>
  )
}
