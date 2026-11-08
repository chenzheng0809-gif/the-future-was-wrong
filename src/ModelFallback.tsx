import {getModelAsset,civilizationModels} from './assets';
import {ArtifactIllustration,CivilizationEmblem,artifactRecords} from './ArchiveVisuals';
import type {Civ} from './game';
function RobotFallback(){return <div className="robot-fallback" role="img" aria-label="Dr. Wrong 角色轮廓占位"><div className="robot-head"><div>· ·<br/>―</div><i/></div><div className="robot-body">◆</div><small>DR. WRONG / 角色示意</small></div>}
export default function ModelFallback({kind}:{kind:string}){
 const civ=Object.entries(civilizationModels).find(([,value])=>value===kind)?.[0] as Civ|undefined;
 return kind==='dr-wrong'?<RobotFallback/>:<div className="model-static-fallback" role="img" aria-label={`${getModelAsset(kind).label}临时复原图`}>{civ?<CivilizationEmblem id={civ}/>:artifactRecords.some(x=>x.kind===kind)?<ArtifactIllustration kind={kind}/>:null}<small>当前展示的是临时复原形态。</small></div>
}
