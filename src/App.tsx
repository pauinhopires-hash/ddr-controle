import { useState, useCallback, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Toast } from './components/Toast';
import { Inicio } from './screens/Inicio';
import { Etiquetas } from './screens/Etiquetas';
import { QRCodeScreen } from './screens/QRCodeScreen';
import { Validades } from './screens/Validades';
import { Producao } from './screens/Producao';
import { Recebimento } from './screens/Recebimento';
import { Contagem } from './screens/Contagem';
import { Controlados } from './screens/Controlados';
import { Relatorios } from './screens/Relatorios';
import { Catalogo } from './screens/Catalogo';
import { Configuracoes } from './screens/Configuracoes';
import { useLocalStorage } from './hooks/useLocalStorage';
import { SEED_PRODUCTS, DEFAULT_CONFIG } from './data/seed';
import type { Screen, Produto, Config } from './types';

export default function App() {
  const [screen, setScreen] = useState<Screen>('inicio');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useLocalStorage<Produto[]>('ddrc_products', SEED_PRODUCTS);
  const [cfg, setCfg] = useLocalStorage<Config>('ddrc_config', DEFAULT_CONFIG);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const navigate = useCallback((s: Screen) => {
    setScreen(s);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  }, []);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2600);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  function handleSaveProduct(data: Omit<Produto, 'id'> & { id?: string }) {
    if (data.id) {
      setProducts(prev => prev.map(p => p.id === data.id ? { ...p, ...data } as Produto : p));
    } else {
      const newP: Produto = { ...data, id: 'p' + Date.now() } as Produto;
      setProducts(prev => [...prev, newP]);
    }
  }

  function handleDeleteProduct(id: string) {
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  const screens: Record<Screen, React.ReactNode> = {
    inicio: <Inicio onNavigate={navigate} />,
    etiquetas: <Etiquetas products={products} cfg={cfg} onToast={toast} />,
    qrcode: <QRCodeScreen onNavigate={navigate} />,
    validades: <Validades />,
    producao: <Producao products={products} cfg={cfg} onNavigate={navigate} />,
    recebimento: <Recebimento onToast={toast} />,
    contagem: <Contagem onToast={toast} />,
    controlados: <Controlados onToast={toast} />,
    relatorios: <Relatorios onToast={toast} />,
    catalogo: (
      <Catalogo
        products={products}
        onSave={handleSaveProduct}
        onDelete={handleDeleteProduct}
        onRestoreSeed={() => setProducts(SEED_PRODUCTS.slice())}
        onToast={toast}
      />
    ),
    config: <Configuracoes cfg={cfg} onSave={setCfg} />,
  };

  return (
    <div className="app">
      <Sidebar current={screen} onNavigate={navigate} open={sidebarOpen} />
      <div className="main">
        <Topbar onHamb={() => setSidebarOpen(o => !o)} />
        <main className="content">
          {screens[screen]}
        </main>
      </div>
      <Toast message={toastMsg} visible={toastVisible} />
      <div id="printArea" />
    </div>
  );
}
