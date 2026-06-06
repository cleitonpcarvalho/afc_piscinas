import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_BASE || 'http://localhost:3001',
})

export async function getSettings() {
  const { data } = await api.get('/api/settings')
  // Devolve objecto chave→valor simples
  const out = {}
  for (const [k, v] of Object.entries(data)) out[k] = v.value ?? v
  return out
}

export default api
