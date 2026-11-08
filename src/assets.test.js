// @vitest-environment node
import {readFileSync} from 'node:fs';
import {describe,it,expect} from 'vitest';
import {assets,civilizationModels,getModelAsset,modelAssets} from './assets';
import {generate,ids} from './game';

describe('verified model mappings',()=>{
 it('uses the replacement Dr. Wrong and respects the latest complete civilization assignments',()=>{
  expect(getModelAsset('dr-wrong').source).toBe('mr wrong.glb');
  expect(getModelAsset(civilizationModels.MACHINE).source).toContain('复古科幻人形机器人');
  expect(getModelAsset(civilizationModels.WORKER).source).toBe('打工机器人.glb');
  expect(getModelAsset(civilizationModels.OCEAN).source).toBe('海洋.glb');
  expect(getModelAsset(civilizationModels.CAT).source).toContain('国王猫');
  expect(getModelAsset(civilizationModels.FUNGI).source).toBe('菌菇.glb');
  expect(Object.values(civilizationModels)).not.toContain('sci-fi-robot');
  expect(assets.drWrong).toContain('?v=3');
 });
 it('maps the first two artifacts to the supplied models',()=>{
  expect(getModelAsset('milk-tea').source).toContain('珍珠奶茶杯');
  expect(getModelAsset('airpods-max').source).toContain('头戴式耳机');
  expect(getModelAsset('milk-tea').available).toBe(true);
  expect(getModelAsset('airpods-max').available).toBe(true);
  expect(getModelAsset('photo-projector').source).toContain('蒸汽朋克照片投影仪');
 });
 it('all nine active models are real, complete GLB 2 files with mesh geometry',()=>{
  const supplied=Object.values(modelAssets).filter(x=>x.available);expect(supplied).toHaveLength(9);
  for(const asset of supplied){
   const data=readFileSync(`public${asset.url.split('?')[0]}`);
   expect(data.subarray(0,4).toString()).toBe('glTF');
   expect(data.readUInt32LE(4)).toBe(2);expect(data.readUInt32LE(8)).toBe(data.length);
   expect(data.readUInt32LE(16)).toBe(0x4e4f534a);
   const json=JSON.parse(data.subarray(20,20+data.readUInt32LE(12)).toString());
   expect(json.meshes.length).toBeGreaterThan(0);expect(json.scenes.length).toBeGreaterThan(0);
  }
 });
 it('all 125 game paths resolve through the explicit dominant-model mapping',()=>{
  for(const a of ids)for(const b of ids)for(const c of ids){const r=generate([a,b,c]);const asset=getModelAsset(civilizationModels[r.dominant]);expect(asset).toBe(modelAssets[civilizationModels[r.dominant]]);expect(asset.available).toBe(true);}
 });
 it('keeps the five civilization models distinct and available',()=>{
  expect(new Set(Object.values(civilizationModels)).size).toBe(5);
  expect(getModelAsset(civilizationModels.OCEAN).available).toBe(true);
  expect(getModelAsset(civilizationModels.WORKER).available).toBe(true);
  expect(civilizationModels.WORKER).not.toBe(civilizationModels.MACHINE);
 });
});
it('decodes every compressed buffer with the exact Meshopt decoder bundled in the game',async()=>{
 const {MeshoptDecoder}=await import('three-stdlib');
 const decoder=typeof MeshoptDecoder==='function'?MeshoptDecoder():MeshoptDecoder;
 await decoder.ready;
 for(const asset of Object.values(modelAssets).filter(x=>x.available)){
  const data=readFileSync(`public${asset.url.split('?')[0]}`),jsonLength=data.readUInt32LE(12);
  const json=JSON.parse(data.subarray(20,20+jsonLength).toString());
  expect(json.extensionsRequired).toContain('EXT_meshopt_compression');
  const binStart=20+jsonLength+8;
  for(const view of json.bufferViews){const ext=view.extensions?.EXT_meshopt_compression;if(!ext)continue;const output=new Uint8Array(ext.count*ext.byteStride);const bytes=data.subarray(binStart+(ext.byteOffset||0),binStart+(ext.byteOffset||0)+ext.byteLength);expect(()=>decoder.decodeGltfBuffer(output,ext.count,ext.byteStride,bytes,ext.mode,ext.filter)).not.toThrow();}
 }
});
it('resolves assets under a repository subpath without breaking local hosting',async()=>{
 const {vi}=await import('vitest');const {assetUrl}=await import('./assets');
 try{vi.stubEnv('BASE_URL','/the-future-was-wrong/');expect(assetUrl('/models/cat.glb?v=3')).toBe('/the-future-was-wrong/models/cat.glb?v=3');expect(assetUrl('images/memory-photo.png')).toBe('/the-future-was-wrong/images/memory-photo.png')}finally{vi.unstubAllEnvs()}
});
