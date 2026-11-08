import {Component,Suspense,useCallback,useEffect,useMemo,useRef,useState,type ReactNode} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import {OrbitControls,useGLTF,Center,useProgress} from '@react-three/drei';
import type {OrbitControls as OrbitControlsImpl} from 'three-stdlib';
import {Box3,Vector3,Group} from 'three';
import {getModelAsset,civilizationModels} from './assets';
import {ArtifactIllustration,CivilizationEmblem,artifactRecords} from './ArchiveVisuals';
import type {Civ} from './game';
import {retainModel} from './modelResources';

class Boundary extends Component<{children:ReactNode;onError:()=>void;fallback:ReactNode},{error:boolean}>{
 state={error:false};static getDerivedStateFromError(){return {error:true}}componentDidCatch(){this.props.onError()}render(){return this.state.error?this.props.fallback:this.props.children}
}
function Model({url,awakening,onReady}:{url:string;awakening:boolean;onReady:()=>void}){
 // Meshopt decoder is bundled locally by Drei; no CDN decoder or external request.
 const {scene}=useGLTF(url,false,true);const group=useRef<Group>(null);
 const model=useMemo(()=>{const clone=scene.clone(true);const box=new Box3().setFromObject(clone);const size=box.getSize(new Vector3());const center=box.getCenter(new Vector3());clone.position.sub(center);const root=new Group();root.add(clone);root.scale.setScalar(2.7/Math.max(size.x,size.y,size.z,0.001));return root},[scene]);
 useEffect(()=>retainModel(url,scene,()=>useGLTF.clear(url)),[url,scene]);
 useEffect(onReady,[onReady]);
 const reduced=useMemo(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches,[]);
 useFrame(({clock})=>{if(group.current&&awakening&&!reduced){group.current.position.y=Math.sin(clock.elapsedTime*1.4)*.025;group.current.rotation.z=Math.sin(clock.elapsedTime*.8)*.018}});
 return <group ref={group} rotation={[0,-.12,0]}><primitive object={model}/></group>
}
function RobotFallback(){return <div className="robot-fallback" role="img" aria-label="Dr. Wrong 角色轮廓占位"><div className="robot-head"><div>· ·<br/>―</div><i/></div><div className="robot-body">◆</div><small>DR. WRONG / 角色示意</small></div>}
function Fallback({kind}:{kind:string}){
 const civ=Object.entries(civilizationModels).find(([,value])=>value===kind)?.[0] as Civ|undefined;
 return kind==='dr-wrong'?<RobotFallback/>:<div className="model-static-fallback" role="img" aria-label={`${getModelAsset(kind).label}临时复原图`}>{civ?<CivilizationEmblem id={civ}/>:artifactRecords.some(x=>x.kind===kind)?<ArtifactIllustration kind={kind}/>:null}<small>当前展示的是临时复原形态。</small></div>
}
export default function ModelViewer({kind,awakening=false}:{kind:string;awakening?:boolean}){
 const [retry,setRetry]=useState(0),[failed,setFailed]=useState(false),[ready,setReady]=useState(false);
 const controls=useRef<OrbitControlsImpl>(null);const {progress}=useProgress();
 const asset=getModelAsset(kind),url=asset.url;
 const markReady=useCallback(()=>setReady(true),[]),markFailed=useCallback(()=>setFailed(true),[]);
 function retryLoad(){useGLTF.clear(url);setFailed(false);setReady(false);setRetry(v=>v+1)}
 const fallback=<Fallback kind={kind}/>;
 return <div className={`viewer ${awakening?'character-viewer':''} ${ready?'model-ready':''}`}>
 {failed?fallback:<Boundary key={kind+retry} onError={markFailed} fallback={fallback}><Canvas frameloop={awakening?'always':'demand'} dpr={[1,1.25]} camera={{position:[0,.1,5.5],fov:34}} gl={{alpha:true,antialias:true,powerPreference:'default'}} fallback={fallback} onCreated={({gl})=>{gl.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();markFailed()},{once:true})}}><ambientLight intensity={1.5}/><directionalLight position={[3,5,4]} intensity={2.5} color="#ffe2bb"/><directionalLight position={[-3,2,1]} intensity={1}/><Suspense fallback={null}><Boundary onError={markFailed} fallback={null}><Center><Model url={url} awakening={awakening} onReady={markReady}/></Center></Boundary></Suspense>{!awakening&&<OrbitControls ref={controls} enablePan={false} minDistance={3} maxDistance={8}/>}</Canvas></Boundary>}
 {!ready&&!failed&&<div className="model-status" role="status">正在调取 {asset.label}<small>{Math.min(99,Math.round(progress))}% · 首次载入请稍候</small><div className="model-loading-line"><i style={{width:`${Math.min(99,progress)}%`}}/></div></div>}
 {!awakening&&ready&&!failed&&<div className="model-tools"><small>拖动旋转 · 滚轮或双指缩放</small><button className="text" onClick={()=>controls.current?.reset()} aria-label="重置模型视角">重置视角 ↺</button></div>}
 {failed&&<div className="model-error" role="status"><small>遗物影像暂时无法还原，不影响继续考古。</small><button className="text" onClick={retryLoad}>重试加载模型 ↻</button></div>}
 </div>
}
