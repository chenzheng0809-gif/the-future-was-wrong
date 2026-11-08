import {Material,Texture,type Object3D,type BufferGeometry} from 'three';
const retained=new Map<string,{users:number;timer:ReturnType<typeof setTimeout>|null}>();
export function disposeModel(scene:Object3D){
 const geometries=new Set<BufferGeometry>(),materials=new Set<Material>(),textures=new Set<Texture>();
 scene.traverse(object=>{const mesh=object as Object3D&{geometry?:BufferGeometry;material?:Material|Material[]};if(mesh.geometry)geometries.add(mesh.geometry);if(mesh.material)for(const material of Array.isArray(mesh.material)?mesh.material:[mesh.material])materials.add(material)});
 for(const material of materials)for(const value of Object.values(material))if(value instanceof Texture)textures.add(value);
 textures.forEach(texture=>texture.dispose());materials.forEach(material=>material.dispose());geometries.forEach(geometry=>geometry.dispose());
}
/** Defer teardown one task to tolerate React StrictMode's immediate effect remount. */
export function retainModel(url:string,scene:Object3D,clearCache:()=>void){
 let entry=retained.get(url);if(!entry){entry={users:0,timer:null};retained.set(url,entry)}
 if(entry.timer!==null){clearTimeout(entry.timer);entry.timer=null}entry.users++;
 let released=false;
 return ()=>{if(released)return;released=true;entry.users--;if(entry.users>0)return;entry.timer=setTimeout(()=>{if(entry.users>0)return;retained.delete(url);disposeModel(scene);clearCache()},0)};
}
