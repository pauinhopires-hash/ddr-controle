import { useState, useEffect } from 'react';
import type { Produto, Metodo, Unidade } from '../types';

interface ModalProdutoProps {
  produto: Produto | null;
  onSave: (p: Omit<Produto, 'id'> & { id?: string }) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function ModalProduto({ produto, onSave, onDelete, onClose }: ModalProdutoProps) {
  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState('');
  const [marca, setMarca] = useState('');
  const [sif, setSif] = useState('');
  const [medida, setMedida] = useState(600);
  const [un, setUn] = useState<Unidade>('g');
  const [metodo, setMetodo] = useState<Metodo>('Resfriado');
  const [dias, setDias] = useState(30);

  useEffect(() => {
    if (produto) {
      setNome(produto.nome);
      setGrupo(produto.grupo);
      setMarca(produto.marca);
      setSif(produto.sif);
      setMedida(produto.medida);
      setUn(produto.un);
      setMetodo(produto.metodo);
      setDias(produto.dias);
    } else {
      setNome(''); setGrupo(''); setMarca(''); setSif('');
      setMedida(600); setUn('g'); setMetodo('Resfriado'); setDias(30);
    }
  }, [produto]);

  function handleSave() {
    if (!nome.trim()) { alert('Informe o nome.'); return; }
    onSave({ id: produto?.id, nome: nome.trim(), grupo: grupo.trim(), marca: marca.trim(), sif: sif.trim(), medida, un, metodo, dias });
  }

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3>{produto ? 'Editar produto' : 'Novo produto'}</h3>
        <label className="fld"><span>Nome <span className="req">*</span></span>
          <input value={nome} onChange={e => setNome(e.target.value)} />
        </label>
        <div className="two">
          <label className="fld"><span>Grupo</span>
            <input value={grupo} onChange={e => setGrupo(e.target.value)} placeholder="Ex.: Proteínas, Hortifruti…" />
          </label>
          <label className="fld"><span>Marca / Forn.</span>
            <input value={marca} onChange={e => setMarca(e.target.value)} />
          </label>
        </div>
        <div className="three">
          <label className="fld"><span>SIF</span>
            <input value={sif} onChange={e => setSif(e.target.value)} />
          </label>
          <label className="fld"><span>Medida padrão</span>
            <input type="number" min={0} value={medida} onChange={e => setMedida(Number(e.target.value))} />
          </label>
          <label className="fld"><span>Unidade</span>
            <select value={un} onChange={e => setUn(e.target.value as Unidade)}>
              {(['g', 'kg', 'ml', 'L', 'un'] as Unidade[]).map(u => <option key={u}>{u}</option>)}
            </select>
          </label>
        </div>
        <div className="two">
          <label className="fld"><span>Método</span>
            <select value={metodo} onChange={e => setMetodo(e.target.value as Metodo)}>
              {(['Congelado', 'Resfriado', 'Temp. Ambiente', 'Quente'] as Metodo[]).map(m => <option key={m}>{m}</option>)}
            </select>
          </label>
          <label className="fld"><span>Validade padrão (dias)</span>
            <input type="number" min={0} value={dias} onChange={e => setDias(Number(e.target.value))} />
          </label>
        </div>
        <div className="modal-foot">
          {produto && (
            <button className="btn btn-danger btn-sm" style={{ marginRight: 'auto' }}
              onClick={() => { if (confirm('Excluir este produto?')) onDelete(produto.id); }}>
              Excluir
            </button>
          )}
          <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary btn-sm" onClick={handleSave}>Salvar</button>
        </div>
      </div>
    </div>
  );
}
