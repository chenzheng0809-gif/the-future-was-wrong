import {useEffect,useState} from 'react';
import ModelViewer from './LazyModelViewer';
import {awakeningLines} from './assets';

export function DrWrongBadge(){return <div className="dr-badge"><svg role="img" aria-label="Dr. Wrong CRT 轮廓占位" viewBox="0 0 64 72"><rect x="8" y="7" width="48" height="35" rx="8" fill="#d6c6a7"/><rect x="14" y="13" width="31" height="22" rx="5" fill="#302d22"/><path d="M20 24h5m8 0h5" stroke="#d8ae67" strokeWidth="3"/><circle cx="50" cy="21" r="2" fill="#66503c"/><path d="m20 46-6 22h36l-6-22-12 7Z" fill="#716453"/><path d="m29 51 3 6 3-6-3 17Z" fill="#c69a62"/></svg><span>DR. WRONG<small>AI CURATOR / 3026</small></span></div>}
export default function DrWrongAwakening({onComplete}:{onComplete:()=>void}){
 const [line,setLine]=useState(0);
 useEffect(()=>{const timers=[setTimeout(()=>setLine(1),2400),setTimeout(()=>setLine(2),4800),setTimeout(onComplete,7600)];return()=>timers.forEach(clearTimeout)},[onComplete]);
 return <section className="awakening" aria-label="Dr. Wrong 苏醒演出"><div className="terminal-glow" aria-hidden="true"/><div className="awakening-model"><ModelViewer kind="dr-wrong" awakening/></div><article className="awakening-dialogue archive-paper"><DrWrongBadge/><label>TERMINAL ONLINE <span className="live-dot"/> {String(line+1).padStart(2,'0')} / 03</label><p key={line} aria-live="polite">「{awakeningLines[line]}」</p><div className="dialogue-track">{awakeningLines.map((_,i)=><i key={i} className={i<=line?'active':''}/>)}</div><small>正在调取第一件人类遗物……</small></article><button className="skip-awakening brass-button" onClick={onComplete}>跳过演出 · 开始考古 →</button></section>
}
