import { useState, useEffect } from 'react';
import type { Config } from '../types';

interface ConfiguracoesProps {
  cfg: Config;
  onSave: (c: Config) => void;
}

export function Configuracoes({ cfg, onSave }: ConfiguracoesProps) {
  const [nome, setNome] = useState(cfg.nome);
  const [cnpj, setCnpj] = useState(cfg.cnpj);
  const [end, setEnd] = useState(cfg.end);
  const [resps, setResps] = useState(cfg.resps);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setNome(cfg.nome); setCnpj(cfg.cnpj); setEnd(cfg.end); setResps(cfg.resps); }, [cfg]);

  function handleSave() {
    onSave({ nome, cnpj, end, resps });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <>
      <h1 className="page-title">Dados do estabelecimento</h1>
      <div className="page-sub">Aparecem no rodapé da etiqueta. Edite com os dados reais do restaurante.</div>

      <div className="card" style={{maxWidth:620}}>
        <label className="fld"><span>Nome / Unidade</span>
          <input value={nome} onChange={e => setNome(e.target.value)} />
        </label>
        <label className="fld"><span>CNPJ</span>
          <input value={cnpj} onChange={e => setCnpj(e.target.value)} />
        </label>
        <label className="fld"><span>Endereço (CEP + rua, cidade/UF)</span>
          <input value={end} onChange={e => setEnd(e.target.value)} />
        </label>
        <label className="fld"><span>Responsáveis (separados por vírgula)</span>
          <input value={resps} onChange={e => setResps(e.target.value)} />
        </label>
        <div style={{display:'flex',alignItems:'center',gap:14,marginTop:6}}>
          <button className="btn btn-primary btn-sm" onClick={handleSave}>Salvar configurações</button>
          <span style={{color:'var(--verde)',fontWeight:700,opacity:saved?1:0,transition:'.3s'}}>✓ Salvo</span>
        </div>
      </div>
    </>
  );
}
