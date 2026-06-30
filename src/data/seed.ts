import type { Produto, Config } from '../types';

export const SEED_PRODUCTS: Produto[] = [
  { id: 'p1', nome: 'Ancho', grupo: 'Proteínas', marca: 'Swift', sif: '0303', medida: 600, un: 'g', metodo: 'Congelado', dias: 30 },
  { id: 'p2', nome: 'Picanha', grupo: 'Proteínas', marca: 'Friboi', sif: '1751', medida: 1500, un: 'g', metodo: 'Congelado', dias: 30 },
  { id: 'p3', nome: 'Salmão', grupo: 'Peixes e Frutos do Mar', marca: 'Frescatto', sif: '2510', medida: 1000, un: 'g', metodo: 'Resfriado', dias: 3 },
  { id: 'p4', nome: 'Camarão', grupo: 'Peixes e Frutos do Mar', marca: 'Netuno', sif: '', medida: 500, un: 'g', metodo: 'Resfriado', dias: 2 },
  { id: 'p5', nome: 'Frango', grupo: 'Proteínas', marca: 'Sadia', sif: '0125', medida: 1000, un: 'g', metodo: 'Congelado', dias: 30 },
  { id: 'p6', nome: 'Bacon', grupo: 'Proteínas', marca: 'Seara', sif: '0444', medida: 1000, un: 'g', metodo: 'Resfriado', dias: 20 },
  { id: 'p7', nome: 'Queijo Mussarela', grupo: 'Laticínios', marca: 'Tirolez', sif: '', medida: 1000, un: 'g', metodo: 'Resfriado', dias: 15 },
  { id: 'p8', nome: 'Maionese', grupo: 'Molhos', marca: "Hellmann's", sif: '', medida: 1000, un: 'g', metodo: 'Resfriado', dias: 30 },
  { id: 'p9', nome: 'Molho de Tomate', grupo: 'Molhos', marca: 'Pomarola', sif: '', medida: 2000, un: 'g', metodo: 'Temp. Ambiente', dias: 60 },
  { id: 'p10', nome: 'Batata Pré-frita', grupo: 'Congelados', marca: 'McCain', sif: '', medida: 2500, un: 'g', metodo: 'Congelado', dias: 90 },
  { id: 'p11', nome: 'Arroz', grupo: 'Mercearia', marca: 'Tio João', sif: '', medida: 5000, un: 'g', metodo: 'Temp. Ambiente', dias: 180 },
  { id: 'p12', nome: 'Pão Brioche', grupo: 'Padaria', marca: 'Wickbold', sif: '', medida: 80, un: 'g', metodo: 'Temp. Ambiente', dias: 5 },
  { id: 'p13', nome: 'Alface', grupo: 'Hortifruti', marca: '—', sif: '', medida: 500, un: 'g', metodo: 'Resfriado', dias: 5 },
  { id: 'p14', nome: 'Cebola', grupo: 'Hortifruti', marca: '—', sif: '', medida: 1000, un: 'g', metodo: 'Temp. Ambiente', dias: 30 },
  { id: 'p15', nome: 'Abacaxi', grupo: 'Hortifruti', marca: '—', sif: '3123', medida: 2000, un: 'g', metodo: 'Resfriado', dias: 30 },
];

export const DEFAULT_CONFIG: Config = {
  nome: 'Restaurante DDR — Matriz',
  cnpj: '01.010.100/7000-10',
  end: 'CEP 05435-030, Rua Purpurina, 400, São Paulo/SP',
  resps: 'Felipe, Ana Rita, João, Maria',
};

export const VALIDADES_MOCK = [
  { n: 'Espaguete', met: 'Resfriado' as const, st: 'venc', txt: 'Vencida 27/11/25', h: '23h59', q: 1 },
  { n: 'Álcool', met: 'Temp. Ambiente' as const, st: 'venc', txt: 'Vencida 05/01/26', h: '08h00', q: 1 },
  { n: 'Arroz', met: 'Temp. Ambiente' as const, st: 'venc', txt: 'Vencida 08/01/26', h: '11h56', q: 1 },
  { n: 'Ancho', met: 'Resfriado' as const, st: 'hoje', txt: 'Vence hoje', h: '18h00', q: 1 },
  { n: 'Abacaxi', met: 'Resfriado' as const, st: 'ok', txt: 'Vence amanhã', h: '10h00', q: 2 },
  { n: 'Salmão', met: 'Resfriado' as const, st: 'ok', txt: 'Vence amanhã', h: '09h30', q: 1 },
];

export const RECEBER_MOCK = [
  { n: 'Água de mel', med: '0 g', met: 'Temp. Ambiente' as const },
  { n: 'Queijo Mussarela', med: '1 kg', met: 'Resfriado' as const },
  { n: 'Salmão', med: '1 kg', met: 'Resfriado' as const },
  { n: 'Patinho Moído', med: '1 kg', met: 'Resfriado' as const },
  { n: 'Ancho', med: '600 g', met: 'Congelado' as const },
];

export const CONTAGENS_MOCK = [
  { ico: '🦐', n: 'Peixes e Frutos do Mar', q: 2, g: ['Frutos do Mar', 'Peixes'] },
  { ico: '🥩', n: 'Proteínas — Bovinos', q: 5, g: ['Bovinos'] },
  { ico: '🥬', n: 'Hortifruti', q: 8, g: ['Frutas', 'Legumes'] },
];

export const CONTROLADOS_MOCK = [
  { n: 'Ancho', met: 'Congelado' as const, e: 0, min: 8, st: 'venc' },
  { n: 'Salmão', met: 'Resfriado' as const, e: 3, min: 5, st: 'hoje' },
  { n: 'Camarão', met: 'Congelado' as const, e: 0, min: 10, st: 'venc' },
  { n: 'Queijo Mussarela', met: 'Resfriado' as const, e: 12, min: 6, st: 'ok' },
  { n: 'Maionese', met: 'Resfriado' as const, e: 4, min: 4, st: 'hoje' },
  { n: 'Arroz', met: 'Temp. Ambiente' as const, e: 9, min: 3, st: 'ok' },
];

export const RELATORIOS_MOCK = [
  { n: '30 dias — 19/01/2026 10:05', p: '30 dias', t: 'Produção' },
  { n: 'Hoje — 15/01/2026 00:00', p: 'Hoje', t: 'Produção' },
  { n: '30 dias — 15/01/2026 10:37', p: '30 dias', t: 'Recebimento' },
  { n: '7 dias — 12/01/2026 09:12', p: '7 dias', t: 'Contagem' },
];
