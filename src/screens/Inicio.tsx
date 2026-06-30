import type { Screen } from '../types';

interface InicioProps {
  onNavigate: (s: Screen) => void;
}

export function Inicio({ onNavigate }: InicioProps) {
  return (
    <>
      <h1 className="page-title">Controle de Insumos — Etiquetadora <span className="i">i</span></h1>
      <div className="page-sub">Atualizado hoje às 15:38</div>

      <div className="grid g2">
        <div className="card">
          <h3>Total de etiquetas controladas</h3>
          <div className="desc">Etiquetas impressas por método de armazenamento.</div>
          <div className="kpi">34.278 <small>Etiquetas totais</small></div>
          <div className="donut-wrap">
            <svg width="160" height="160" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="#eee" strokeWidth="6"/>
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="#2B8AE0" strokeWidth="6" strokeDasharray="60.9 39.1" strokeDashoffset="25"/>
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="#1FAE63" strokeWidth="6" strokeDasharray="19.8 80.2" strokeDashoffset="-35.9"/>
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="#EB7000" strokeWidth="6" strokeDasharray="13.7 86.3" strokeDashoffset="-55.7"/>
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="#E5326B" strokeWidth="6" strokeDasharray="5.6 94.4" strokeDashoffset="-69.4"/>
            </svg>
            <div className="legend">
              <div className="legend-row"><span className="dot" style={{background:'#2B8AE0'}}></span> Congelado <span className="pct">60,86%</span><span className="qt">20.857</span></div>
              <div className="legend-row"><span className="dot" style={{background:'#1FAE63'}}></span> Resfriado <span className="pct">19,77%</span><span className="qt">6.779</span></div>
              <div className="legend-row"><span className="dot" style={{background:'#EB7000'}}></span> Temp. Ambiente <span className="pct">13,57%</span><span className="qt">4.653</span></div>
              <div className="legend-row"><span className="dot" style={{background:'#E5326B'}}></span> Quente <span className="pct">5,81%</span><span className="qt">1.989</span></div>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div>
              <h3>Níveis de estoque</h3>
              <div className="desc">Produtos controlados em estoque.</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => onNavigate('controlados')}>Ver detalhes →</button>
          </div>
          <div className="kpi">509 <small>Produtos totais</small></div>
          <div className="stockbar">
            <i style={{background:'#E5326B',width:'10%'}}></i>
            <i style={{background:'#F5B301',width:'29%'}}></i>
            <i style={{background:'#1FAE63',width:'61%'}}></i>
          </div>
          <div className="stock-leg">
            <div className="row"><span className="dot" style={{background:'#E5326B'}}></span> Sem estoque <span className="p">10,22%</span><b>52</b></div>
            <div className="row"><span className="dot" style={{background:'#F5B301'}}></span> Em estoque mínimo <span className="p">29,07%</span><b>149</b></div>
            <div className="row"><span className="dot" style={{background:'#1FAE63'}}></span> Acima do mínimo <span className="p">60,51%</span><b>308</b></div>
          </div>
        </div>
      </div>

      <div className="card" style={{marginTop:20}}>
        <h3>Da entrada à saída, tudo registrado</h3>
        <div className="desc">A etiqueta acompanha o alimento em todo o ciclo da operação.</div>
        <div className="flow">
          <button className="node" onClick={() => onNavigate('recebimento')}><b>1. Recebimento</b><small>Produto chegou</small></button>
          <button className="node" onClick={() => onNavigate('producao')}><b>2. Produção</b><small>Manipulação</small></button>
          <button className="node" onClick={() => onNavigate('validades')}><b>3. Validades</b><small>Monitoria</small></button>
          <button className="node" onClick={() => onNavigate('contagem')}><b>4. Contagem</b><small>Auditoria</small></button>
          <button className="node" onClick={() => onNavigate('relatorios')}><b>5. Relatórios</b><small>Gerencial</small></button>
        </div>
      </div>
    </>
  );
}
