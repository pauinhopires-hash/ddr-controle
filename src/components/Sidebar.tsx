import { BrandSymbol } from './BrandSymbol';
import type { Screen } from '../types';

const NAV_ITEMS: { screen: Screen; ico: string; label: string; badge?: string }[] = [
  { screen: 'inicio', ico: '🏠', label: 'Início' },
  { screen: 'etiquetas', ico: '🏷️', label: 'Etiquetas' },
  { screen: 'qrcode', ico: '⬛', label: 'QR Code', badge: 'NOVO!' },
  { screen: 'validades', ico: '📅', label: 'Validades' },
  { screen: 'producao', ico: '🍳', label: 'Produção' },
  { screen: 'recebimento', ico: '🚚', label: 'Recebimento' },
  { screen: 'contagem', ico: '🧮', label: 'Contagem' },
  { screen: 'controlados', ico: '💎', label: 'Controlados' },
  { screen: 'relatorios', ico: '📊', label: 'Relatórios' },
];

const CONFIG_ITEMS: { screen: Screen; ico: string; label: string }[] = [
  { screen: 'catalogo', ico: '📦', label: 'Catálogo' },
  { screen: 'config', ico: '⚙️', label: 'Configurações' },
];

interface SidebarProps {
  current: Screen;
  onNavigate: (s: Screen) => void;
  open: boolean;
}

export function Sidebar({ current, onNavigate, open }: SidebarProps) {
  return (
    <aside className={`sidebar${open ? ' open' : ''}`}>
      <div className="brand">
        <span className="r"><BrandSymbol /></span>
        <div>
          <div className="name">DDR <span>Controle</span></div>
          <div className="sub">COZINHA SOB CONTROLE</div>
        </div>
      </div>
      <nav className="nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.screen}
            className={`nav-item${current === item.screen ? ' active' : ''}`}
            onClick={() => onNavigate(item.screen)}
          >
            <span className="ico">{item.ico}</span>
            {item.label}
            {item.badge && <span className="badge-novo">{item.badge}</span>}
          </button>
        ))}
        <div className="nav-group-label">CONFIGURAÇÃO</div>
        {CONFIG_ITEMS.map(item => (
          <button
            key={item.screen}
            className={`nav-item${current === item.screen ? ' active' : ''}`}
            onClick={() => onNavigate(item.screen)}
          >
            <span className="ico">{item.ico}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
