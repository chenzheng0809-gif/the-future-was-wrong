import type {Civ} from './game';

/** Explicit mappings verified against supplied files; filenames do not define civilizations. */
export const assets = {
  background: '/images/museum-background.png',
  memoryPhoto: '/images/memory-photo.png',
  // Revision prevents a running browser from reusing the previous Hi3D model cache.
  drWrong: '/models/dr-wrong.glb?v=3',
};
export interface ModelAsset {
  url: string;
  label: string;
  source: string | null;
  available: boolean;
}
export const modelAssets: Record<string, ModelAsset> = {
  'dr-wrong': {url: assets.drWrong, label: 'Dr. Wrong', source: 'mr wrong.glb', available: true},
  'photo-projector': {url: '/models/photo-projector.glb?v=3', label: '照片投影仪', source: 'Hi3D_蒸汽朋克照片投影仪3D模型_allparts_20261108_171937.glb', available: true},
  'milk-tea': {url: '/models/milk-tea.glb?v=3', label: '珍珠奶茶杯', source: 'Hi3D_写实3D珍珠奶茶杯_allparts_20261108_150402.glb', available: true},
  'airpods-max': {url: '/models/airpods-max.glb?v=3', label: '头戴式耳机', source: 'Hi3D_写实3D头戴式耳机_allparts_20261108_155116.glb', available: true},
  cat: {url: '/models/cat.glb?v=3', label: '猫咪君王', source: 'Hi3D_写实3D国王猫 皇冠披风_allparts_20261108_134743.glb', available: true},
  machine: {url: '/models/machine.glb?v=3', label: '机械共同体', source: 'Hi3D_复古科幻人形机器人3D模型_allparts_20261108_135658.glb', available: true},
  fungi: {url: '/models/fungi.glb?v=3', label: '菌菇文明角色', source: '菌菇.glb', available: true},
  ocean: {url: '/models/ocean.glb?v=3', label: '海洋共同体', source: '海洋.glb', available: true},
  worker: {url: '/models/worker.glb?v=3', label: '加班共同体', source: '打工机器人.glb', available: true},
};
export const civilizationModels: Record<Civ, string> = {
  CAT: 'cat', OCEAN: 'ocean', FUNGI: 'fungi', MACHINE: 'machine', WORKER: 'worker',
};
export function getModelAsset(kind: string): ModelAsset {
  return modelAssets[kind] ?? {url: `/models/${kind}.glb`, label: '遗物', source: null, available: false};
}
export const awakeningLines = [
  '欢迎，首席考古学家。我是 Dr. Wrong。',
  '人类文明的秘密，我已经破解了 99.99%。',
  '剩下的 0.01%，就麻烦您了。',
];
