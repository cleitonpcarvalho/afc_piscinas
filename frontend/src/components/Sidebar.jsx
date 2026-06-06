import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, Image, Settings, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import afcLogo from '../assets/afc_logo.png'

const NAV = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/content',   icon: FileText,        label: 'Conteúdo' },
  { to: '/admin/media',     icon: Image,           label: 'Média' },
  { to: '/admin/settings',  icon: Settings,        label: 'Configurações' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <aside className="w-60 min-h-screen bg-surface border-r border-border flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-border">
        <img src={afcLogo} alt="AFC Piscinas" style={{ height: '36px', width: 'auto', marginBottom: '4px' }} />
        <p className="text-muted text-xs">Painel Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 px-2">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
               ${isActive
                 ? 'text-text bg-bg border-l-[3px] border-accent rounded-l-none pl-[calc(0.75rem-3px)]'
                 : 'text-muted hover:text-text hover:bg-bg/50'
               }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-border">
        <p className="text-text text-xs font-medium truncate">{user?.name || 'Admin'}</p>
        <p className="text-muted text-xs truncate mb-3">{user?.email}</p>
        <button onClick={handleLogout} className="flex items-center gap-2 text-muted hover:text-red-400 text-xs transition-colors">
          <LogOut size={14} /> Sair
        </button>
      </div>
    </aside>
  )
}
