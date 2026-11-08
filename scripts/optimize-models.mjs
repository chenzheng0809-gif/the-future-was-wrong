/** Offline only. Source GLBs are preserved in work/original-models. */
import {mkdir,copyFile,readFile,writeFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {NodeIO} from '@gltf-transform/core';
import {ALL_EXTENSIONS} from '@gltf-transform/extensions';
import {dedup,prune,meshopt,textureCompress} from '@gltf-transform/functions';
import {MeshoptEncoder,MeshoptDecoder} from 'meshoptimizer';
import sharp from 'sharp';
await MeshoptEncoder.ready;await MeshoptDecoder.ready;
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.encoder':MeshoptEncoder,'meshopt.decoder':MeshoptDecoder});
const kinds=['dr-wrong','cat','ocean','fungi','machine','worker','milk-tea','airpods-max','photo-projector'];
await mkdir('work/original-models',{recursive:true});const report=[];
for(const kind of kinds){
 const original=`work/original-models/${kind}.glb`,out=`public/models/${kind}.glb`;
 try{await stat(original)}catch{const candidate=await readFile(out);const meta=JSON.parse(candidate.subarray(20,20+candidate.readUInt32LE(12)).toString());if(meta.extensionsUsed?.includes('EXT_meshopt_compression'))throw Error(`Missing original source: ${original}. Restore the supplied GLB before recompressing.`);await copyFile(out,original)}
 const input=await readFile(original);const document=await io.read(original);
 await document.transform(dedup(),prune(),textureCompress({encoder:sharp,targetFormat:'webp',resize:[2048,2048],lossless:true,effort:50}),meshopt({encoder:MeshoptEncoder,level:'medium',quantizePosition:16,quantizeTexcoord:14,quantizeNormal:12}));
 await io.write(out,document);
 // Decode the result locally to verify compression dependencies and a complete scene.
 const restored=await io.read(out);if(!restored.getRoot().listMeshes().length)throw Error(`No decoded meshes: ${kind}`);
 const output=await readFile(out);report.push({kind,originalBytes:input.length,optimizedBytes:output.length,reductionPercent:Number(((1-output.length/input.length)*100).toFixed(1)),originalSha256:createHash('sha256').update(input).digest('hex'),optimizedSha256:createHash('sha256').update(output).digest('hex')});
 console.log(`${kind}: ${(input.length/1048576).toFixed(1)} → ${(output.length/1048576).toFixed(1)} MiB`);
}
await writeFile('outputs/模型压缩报告.json',JSON.stringify(report,null,2));
