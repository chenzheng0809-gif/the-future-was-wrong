import {useState,useCallback,useEffect} from 'react';
import {ids,generate,endings,type Civ,type Stage} from './game';
import DrWrongAwakening from './DrWrong';
import ArtifactScene from './ArtifactScene';
import ExitConfirmation from './ExitConfirmation';
import {CivilizationReveal,FinalPhotoScene,ArchiveDecisionScene,MemoryScene,EndingScene} from './NarrativeScenes';
import './style.css';
import './interaction.css';
import './narrative.css';

export default function App(){
 const [stage,setStage]=useState<Stage>('INTRO');
 const [picks,setPicks]=useState<Civ[]>([]);
 const [choice,setChoice]=useState<number|null>(null);
 const [decision,setDecision]=useState(0);
 const [memory,setMemory]=useState('');
 const [flipped,setFlipped]=useState(false);
 const [copied,setCopied]=useState(false);
 const [pendingExit,setPendingExit]=useState<'home'|'restart'|null>(null);
 useEffect(()=>{if(!memory.trim())return;const protect=(event:BeforeUnloadEvent)=>{event.preventDefault();event.returnValue=''};window.addEventListener('beforeunload',protect);return()=>window.removeEventListener('beforeunload',protect)},[memory]);
 useEffect(()=>{window.scrollTo(0,0)},[stage]);
 const startArchaeology=useCallback(()=>setStage('ARTIFACT_1'),[]);
 const index=stage==='ARTIFACT_1'?0:stage==='ARTIFACT_2'?1:2;
 const result=picks.length===3?generate(picks):null;
 function finishExit(action:'home'|'restart'){reset();setPendingExit(null);if(action==='restart')setStage('DR_WRONG_AWAKENING')}
 function requestExit(action:'home'|'restart'){if(memory.trim())setPendingExit(action);else finishExit(action)}
 function reset(){setPicks([]);setChoice(null);setMemory('');setFlipped(false);setCopied(false);setDecision(0);setStage('INTRO')}
 function confirmChoice(){if(choice===null)return;setPicks([...picks,ids[choice]]);setChoice(null);setStage((['ARTIFACT_2','ARTIFACT_3','CIVILIZATION_REVEAL'] as Stage[])[index])}
 async function copyArchive(){if(!result)return;const report=`YOUR ARCHIVE · 3026\n${result.name}\n${result.traits.join('\n')}\n${result.motto}\n${endings[decision][1]}\n${endings[decision][0]}\n${memory||'有些记忆，被留在心里。'}\n情感浓度：不予评分\n记忆的意义：由你定义\n保存状态：本次会话`;try{await navigator.clipboard.writeText(report);setCopied(true)}catch{setCopied(false);alert('复制失败，请重试。也可以手动选择档案文字复制。')}}
 return <><div className={`world ${stage==='DR_WRONG_AWAKENING'?'world-awakening':''}`}/><div className="grain"/><header><span>BUREAU OF LOST CIVILIZATIONS</span><span>EST. 3026 <button className="text" onClick={()=>requestExit('home')}>返回首页 / 清除本轮</button></span></header><main key={stage} data-stage={stage}>
 {stage==='INTRO'?<section className="intro"><label>ARCHIVE NO. 001 — HUMANITY</label><h1>THE FUTURE<br/>WAS WRONG<span>.</span></h1><h2>一千年后，我们成了未解之谜。</h2><p>我们留下了整个世界，却没有留下说明书。<br/>现在，轮到你来解释人类文明了。</p><button onClick={()=>setStage('DR_WRONG_AWAKENING')}>开启档案 <b>↗</b></button><small>SINGLE PLAYER · APPROX. 2 MIN</small><small>LOST TOMORROWS / 遗失的明日</small></section>
 :stage==='DR_WRONG_AWAKENING'?<DrWrongAwakening onComplete={startArchaeology}/>
 :stage.startsWith('ARTIFACT_')?<ArtifactScene index={index} choice={choice} previous={picks} onChoose={setChoice} onConfirm={confirmChoice}/>
 :stage==='CIVILIZATION_REVEAL'&&result?<CivilizationReveal result={result} picks={picks} onContinue={()=>setStage('FINAL_ARTIFACT')}/>
 :stage==='FINAL_ARTIFACT'?<FinalPhotoScene flipped={flipped} onFlip={()=>setFlipped(!flipped)} onContinue={()=>setStage('ARCHIVE_DECISION')}/>
 :stage==='ARCHIVE_DECISION'?<ArchiveDecisionScene choice={decision} onChoose={setDecision} flipped={flipped} onFlip={()=>setFlipped(!flipped)} onContinue={()=>setStage('PRIVATE_MEMORY')}/>
 :stage==='PRIVATE_MEMORY'?<MemoryScene memory={memory} onChange={setMemory} onSave={()=>setStage('ENDING')} onSkip={()=>{setMemory('');setStage('ENDING')}}/>
 :stage==='ENDING'&&result?<EndingScene result={result} decision={decision} memory={memory} copied={copied} onCopy={copyArchive} onRestart={()=>requestExit('restart')} onHome={()=>requestExit('home')}/>:null}
 </main>{pendingExit&&<ExitConfirmation action={pendingExit} onCancel={()=>setPendingExit(null)} onConfirm={()=>finishExit(pendingExit)}/>}<aside>3026 / MEMORY DEPARTMENT <span>LOST TOMORROWS · 遗失的明日</span></aside></>
}
