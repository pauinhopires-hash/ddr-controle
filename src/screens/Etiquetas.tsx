import { useState, useEffect, useCallback } from 'react';
import { LabelPreview, type LabelData } from '../components/LabelPreview';
import { toLocalInput, toDateInput, rid } from '../utils/date';
import type { Produto, Config, Metodo, Unidade, TipoEtiqueta } from '../types';

interface EtiquetasProps {
  products: Produto[];
  cfg: Config;
  onToast: (msg: string) => void;
}

export function Etiquetas({ products, cfg, onToast }: EtiquetasProps) {
  const [tipo, setTipo] = useState<TipoEtiqueta>('manipulacao');
  const [prodId, setProdId] = useState(products[0]?.id ?? '');
  const [metodo, setMetodo] = useState<Metodo>('Congelado');
  const [peso, setPeso] = useState('600');
  const [un, setUn] = useState<Unidade>('g');
  const [dataStr, setDataStr] = useState(() => toLocalInput((() => { const d = new Date(); d.setSeconds(0,0); return d; })()));
  const [originalStr, setOriginalStr] = useState(() => toDateInput((() => { const d = new Date(); d.setMonth(d.getMonth()+2); return d; })()));
  const [dias, setDias] = useState('30');
  const [validadeStr, setValidadeStr] = useState('');
  const [marca, setMarca] = useState('');
  const [sif, setSif] = useState('');
  const [lote, setLote] = useState('');
  const [resp, setResp] = useState('');
  const [qtd, setQtd] = useState('1');
  const [size, setSize] = useState('60');
  const [capped, setCapped] = useState(false);
  const [labelData, setLabelData] = useState<LabelData | null>(null);

  const resps = (cfg.resps || '').split(',').map(s => s.trim()).filter(Boolean);

  const recalc = useCallback((baseStr: string, diasVal: string, origStr: string) => {
    const base = baseStr ? new Date(baseStr) : new Date();
    const d = parseInt(diasVal || '0', 10);
    const val = new Date(base.getTime());
    val.setDate(val.getDate() + d);
    val.setHours(23, 59, 0, 0);
    let cap = false;
    if (origStr) {
      const orig = new Date(origStr + 'T23:59');
      if (val > orig) { Object.assign(val, orig); cap = true; }
    }
    setCapped(cap);
    return toLocalInput(val);
  }, []);

  useEffect(() => {
    const p = products.find(x => x.id === prodId);
    if (!p) return;
    setMetodo(p.metodo);
    setPeso(String(p.medida));
    setUn(p.un);
    setMarca(p.marca && p.marca !== '—' ? p.marca : '');
    setSif(p.sif || '');
    setLote(p.nome.toUpperCase());
    setDias(String(p.dias));
    const newVal = recalc(dataStr, String(p.dias), originalStr);
    setValidadeStr(newVal);
  }, [prodId, products]);

  useEffect(() => {
    const newVal = recalc(dataStr, dias, originalStr);
    setValidadeStr(newVal);
  }, [dataStr, dias, originalStr, recalc]);

  useEffect(() => {
    if (resps.length > 0 && !resp) setResp(resps[0]);
  }, [cfg.resps]);

  useEffect(() => {
    const p = products.find(x => x.id === prodId);
    setLabelData({
      tipo,
      nome: p?.nome || 'Produto',
      metodo,
      peso,
      un,
      original: originalStr ? new Date(originalStr + 'T00:00') : null,
      data: dataStr ? new Date(dataStr) : new Date(),
      validade: validadeStr ? new Date(validadeStr) : new Date(),
      marca,
      sif,
      lote,
      resp,
      id: rid(),
      capped,
    });
  }, [tipo, prodId, metodo, peso, un, originalStr, dataStr, validadeStr, marca, sif, lote, resp, capped, products]);

  function handlePrint() {
    onToast(`${Math.max(1, parseInt(qtd || '1', 10))} etiqueta(s) enviada(s) para impressão`);
    window.print();
  }

  return (
    <>
      <h1 className="page-title">Imprimir etiqueta</h1>
      <div className="page-sub">Escolha o tipo, o produto e ajuste o que precisar. A validade é calculada pelo método e respeita a validade original do fabricante.</div>

      <div className="etq-grid">
        <div className="card">
          <div className="seg">
            <button className={tipo === 'manipulacao' ? 'on' : ''} onClick={() => setTipo('manipulacao')}>Manipulação / Produção</button>
            <button className={tipo === 'recebimento' ? 'on' : ''} onClick={() => setTipo('recebimento')}>Recebimento</button>
          </div>

          <label className="fld">
            <span>Produto <span className="req">*</span></span>
            <select value={prodId} onChange={e => setProdId(e.target.value)}>
              {products.map(p => <option key={p.id} value={p.id}>{p.nome}{p.grupo ? ` · ${p.grupo}` : ''}</option>)}
            </select>
          </label>

          <div className="two">
            <label className="fld">
              <span>Método de armazenamento</span>
              <select value={metodo} onChange={e => setMetodo(e.target.value as Metodo)}>
                {(['Congelado','Resfriado','Temp. Ambiente','Quente'] as Metodo[]).map(m => <option key={m}>{m}</option>)}
              </select>
            </label>
            <label className="fld">
              <span>Medida</span>
              <div className="two" style={{gap:8}}>
                <input type="number" min={0} value={peso} onChange={e => setPeso(e.target.value)} />
                <select value={un} onChange={e => setUn(e.target.value as Unidade)}>
                  {(['g','kg','ml','L','un'] as Unidade[]).map(u => <option key={u}>{u}</option>)}
                </select>
              </div>
            </label>
          </div>

          <div className="two">
            <label className="fld">
              <span>{tipo === 'manipulacao' ? 'Data de manipulação' : 'Data de recebimento'}</span>
              <input type="datetime-local" value={dataStr} onChange={e => setDataStr(e.target.value)} />
            </label>
            <label className="fld">
              <span>Validade original (fabricante)</span>
              <input type="date" value={originalStr} onChange={e => setOriginalStr(e.target.value)} />
            </label>
          </div>

          <div className="two">
            <label className="fld">
              <span>Validade (dias após {tipo === 'manipulacao' ? 'manipulação' : 'recebimento'})</span>
              <input type="number" min={0} value={dias} onChange={e => setDias(e.target.value)} />
            </label>
            <label className="fld">
              <span>Validade calculada</span>
              <input type="datetime-local" value={validadeStr} onChange={e => setValidadeStr(e.target.value)} />
            </label>
          </div>

          {capped && (
            <div className="note-box">⚠ <span>Validade ajustada para respeitar a validade original do produto.</span></div>
          )}

          <div className="three">
            <label className="fld"><span>Marca / Forn.</span><input value={marca} onChange={e => setMarca(e.target.value)} /></label>
            <label className="fld"><span>SIF</span><input value={sif} onChange={e => setSif(e.target.value)} /></label>
            <label className="fld"><span>Lote</span><input value={lote} onChange={e => setLote(e.target.value)} /></label>
          </div>

          <div className="two">
            <label className="fld">
              <span>Responsável <span className="req">*</span></span>
              <select value={resp} onChange={e => setResp(e.target.value)}>
                {resps.length > 0
                  ? resps.map(r => <option key={r}>{r}</option>)
                  : <option>—</option>}
              </select>
            </label>
            <label className="fld">
              <span>Qtd. de etiquetas</span>
              <input type="number" min={1} value={qtd} onChange={e => setQtd(e.target.value)} />
            </label>
          </div>

          <label className="fld">
            <span>Ponto de impressão</span>
            <select value={size} onChange={e => setSize(e.target.value)}>
              <option value="60">DR 60×60 (60mm × 60mm)</option>
              <option value="80">Etiqueta 80×80 (80mm × 80mm)</option>
              <option value="40x60">Etiqueta 40×60 (40mm × 60mm)</option>
            </select>
          </label>

          <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={handlePrint}>
            🖨️ Imprimir etiqueta
          </button>
        </div>

        <div className="preview-col">
          <div className="preview-head">Pré-visualização</div>
          <div className="label-stage">
            {labelData && <LabelPreview data={labelData} cfg={cfg} />}
          </div>
        </div>
      </div>
    </>
  );
}
