export type Metodo = 'Congelado' | 'Resfriado' | 'Temp. Ambiente' | 'Quente';
export type Unidade = 'g' | 'kg' | 'ml' | 'L' | 'un';
export type TipoEtiqueta = 'manipulacao' | 'recebimento';

export interface Produto {
  id: string;
  nome: string;
  grupo: string;
  marca: string;
  sif: string;
  medida: number;
  un: Unidade;
  metodo: Metodo;
  dias: number;
}

export interface Config {
  nome: string;
  cnpj: string;
  end: string;
  resps: string;
}

export type Screen =
  | 'inicio'
  | 'etiquetas'
  | 'qrcode'
  | 'validades'
  | 'producao'
  | 'recebimento'
  | 'contagem'
  | 'controlados'
  | 'relatorios'
  | 'catalogo'
  | 'config';
