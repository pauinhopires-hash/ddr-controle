import { useState } from 'react';
import { MetodoTag } from '../components/MetodoTag';
import { VALIDADES_MOCK } from '../data/seed';

const FILTROS = ['Todas', 'Vencidas', 'Hoje', 'Amanhã', '7 dias'];

export function Validades() {
  const [filtro, setFiltro] = useState('Todas');

  const items = VALIDADES_MOCK.filter(v => {
    if (filtro === 'Vencidas') return v.st === 'venc';
    if (filtro === 'Hoje') return v.st === 'hoje';
    if (filtro === 'Amanhã') return v.st === 'ok' && v.txt.includes('amanhã');
    return true;
  });

  return (
    <>
      <h1 className="page-title">Monitoria de validades</h1>
      <div className="page-sub">Desperdício zero e CMV no ponto. Saiba o que vence hoje, amanhã ou quando quiser.</div>

      <div className="grid g3" style={{marginBottom:22}}>
        <div className="card" style={{textAlign:'center'}}>
          <div style={{color:'var(--vermelho)',fontWeight:700,fontSize:13}}>VENCIDAS</div>
          <div className="kpi" style={{color:'var(--vermelho)'}}>1.189</div>
          <small style={{color:'var(--cinza-texto)'}}>de 2.203 etiquetas</small>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div style={{color:'var(--amarelo)',fontWeight:700,fontSize:13}}>VENCE HOJE</div>
          <div className="kpi" style={{color:'var(--amarelo)'}}>1</div>
          <small style={{color:'var(--cinza-texto)'}}>etiqueta</small>
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <div style={{color:'var(--verde)',fontWeight:700,fontSize:13}}>VENCE AMANHÃ</div>
          <div className="kpi" style={{color:'var(--verde)'}}>3</div>
          <small style={{color:'var(--cinza-texto)'}}>etiquetas</small>
        </div>
      </div>

      <div className="chips">
        {FILTROS.map(f => (
          <button key={f} className={`chip${filtro === f ? ' active' : ''}`} onClick={() => setFiltro(f)}>{f}</button>
        ))}
      </div>

      <div className="vgrid">
        {items.map((v, i) => (
          <div className="vcard" key={i}>
            <h4>{v.n}</h4>
            <div style={{marginTop:6}}><MetodoTag metodo={v.met} /></div>
            <div className="vrow">
              <span className={`pill-status ${v.st === 'venc' ? 's-venc' : v.st === 'hoje' ? 's-hoje' : 's-ok'}`}>{v.txt}</span>
              <span>{v.h}</span>
            </div>
            <div className="vrow" style={{marginTop:4}}>
              <span>Qtd. etiquetas</span>
              <b style={{color:'var(--navy)'}}>{v.q}</b>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
