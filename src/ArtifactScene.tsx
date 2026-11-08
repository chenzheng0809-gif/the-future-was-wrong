import ModelViewer from './LazyModelViewer';
import {DrWrongBadge} from './DrWrong';
import {artifacts,ids,type Civ} from './game';
import {ArtifactIllustration,CivilizationEmblem,artifactRecords} from './ArchiveVisuals';

export default function ArtifactScene({index,choice,previous,onChoose,onConfirm}:{index:number;choice:number|null;previous:Civ[];onChoose:(n:number)=>void;onConfirm:()=>void}){
 const artifact=artifacts[index],record=artifactRecords[index];
 return <section className="archaeology-scene" aria-label={`第 ${index+1} 轮考古`}>
  <div className="scene-heading"><span>HUMANITY / FIELD NOTES</span><div className="archive-slots" aria-label={`考古进度 ${index+1} / 3`}>{[0,1,2].map(i=><span key={i} className={i===index?'current':i<index?'complete':''}>{previous[i]?<CivilizationEmblem id={previous[i]}/>:<span>0{i+1}</span>}</span>)}</div></div>
  <article className="artifact-dossier archive-paper"><div className="fold-corner"/><label>ARCHIVE 00{index+1} <span>/ 003</span></label><h2>{artifact.name}</h2><div className="dossier-sketch"><ArtifactIllustration kind={record.kind}/><span>FIG. 0{index+1}</span></div><dl><div><dt>遗物编号</dt><dd>H-00{index+1}</dd></div><div><dt>材质</dt><dd>{record.material}</dd></div><div><dt>年代</dt><dd>{record.date}</dd></div></dl><h3>观察手记</h3><ul>{record.notes.map(note=><li key={note}>{note}</li>)}</ul><div className="dossier-stamp">待 鉴 定</div></article>
  <div className="artifact-stage"><span className="artifact-stage-label">EXHIBIT / 00{index+1}</span><ModelViewer kind={record.kind}/><div className="rotation-guide" aria-hidden="true">⤺ <span>检视遗物</span> ⤻</div></div>
  <div className="interpretation-panel"><article className="curator-note archive-paper"><DrWrongBadge/><p>「{artifact.line}」</p></article><fieldset className="interpretation-options"><legend>你认为，它真正的用途是什么？</legend>{artifact.options.map((text,i)=><button key={ids[i]} type="button" aria-pressed={choice===i} aria-label={`${String.fromCharCode(65+i)}. ${text}`} className={`interpretation-option ${choice===i?'is-chosen':''}`} onClick={()=>onChoose(i)}><span className="option-letter" aria-hidden="true">{String.fromCharCode(65+i)}</span><span className="option-copy">{text}</span><span className="option-marker" aria-hidden="true">{choice===i?'✓':''}</span></button>)}</fieldset><div className="decision-bar"><span aria-live="polite">{choice===null?'请选择一种解释。':'推断已选定，等待归档。'}</span><button className="brass-button confirm-choice" disabled={choice===null} onClick={onConfirm}>确认选择 <span aria-hidden="true">⟶</span></button></div></div>
  <footer className="scene-footer"><span>考古记录 / {String(index+1).padStart(2,'0')} OF 03</span><span>没有唯一正确答案。你的解释，将成为历史。</span></footer>
 </section>
}
