import type { Metodo } from '../types';

const cls: Record<Metodo, string> = {
  'Congelado': 'm-Congelado',
  'Resfriado': 'm-Resfriado',
  'Temp. Ambiente': 'm-TempAmbiente',
  'Quente': 'm-Quente',
};

export function MetodoTag({ metodo }: { metodo: Metodo }) {
  return <span className={`tag ${cls[metodo]}`}>{metodo}</span>;
}
