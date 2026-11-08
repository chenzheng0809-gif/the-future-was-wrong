import type {Civ} from './game';

export function CivilizationEmblem({id}:{id:Civ}){
 const shapes:Record<Civ,React.ReactNode>={
  CAT:<><path d="M8 13 7 5l8 4h10l8-4-1 8c5 15-2 21-12 21S3 28 8 13Z"/><path d="M13 20h2m10 0h2m-8 5h2m-8 2-8-1m22 1 8-1"/></>,
  OCEAN:<><path d="M4 23c7-12 10 7 17-5S35 9 36 18c-6-4-8 9-15 8S10 18 4 29m0 4c8-8 12 6 20 0s10-5 13-2"/></>,
  FUNGI:<><path d="M3 21C3 2 37 2 37 21Zm13 0-3 14h14l-3-14m-13-1v-4m9 4V9m9 11v-4"/></>,
  MACHINE:<><path d="m16 4 8 0 1 5 5 3 5-1 4 7-4 4v6l-5 1-3 5-2 4h-9l-1-5-5-3-5 1-4-7 4-4v-6l5-1 3-5Z"/><circle cx="20" cy="21" r="7"/></>,
  WORKER:<><rect x="4" y="12" width="32" height="23" rx="3"/><path d="M14 12V6h12v6M4 21c10 5 22 5 32 0m-18 0h4v7h-4Z"/></>,
 };
 return <svg viewBox="0 0 40 40" aria-hidden="true" className="civilization-emblem" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">{shapes[id]}</svg>
}
export function ArtifactIllustration({kind}:{kind:string}){
 return <svg viewBox="0 0 220 240" className="artifact-illustration" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 {kind==='milk-tea'?<><path d="m65 81 13 126q32 14 64 0l13-126M55 79h110v10H55Zm8-6c0-54 94-54 94 0M108 69l20-61h11l-20 65M76 110q35 10 69 0"/><ellipse cx="110" cy="78" rx="55" ry="9"/>{[[90,177],[112,185],[132,172],[98,200],[128,200],[89,155],[119,158]].map(([x,y])=><circle key={x+':'+y} cx={x} cy={y} r="6" fill="currentColor" fillOpacity=".4"/>)}<path d="m83 125 4 18m40-108 4-13"/></>:kind==='airpods-max'?<><path d="M42 128V91c0-85 136-85 136 0v37M54 126V91c0-67 112-67 112 0v35M63 50c29-25 65-25 94 0"/><rect x="31" y="116" width="46" height="83" rx="18" transform="rotate(-8 54 155)"/><rect x="143" y="116" width="46" height="83" rx="18" transform="rotate(8 166 155)"/><path d="m45 130 6 51m122-51-6 51"/></>:kind==='photo-projector'?<><path d="m66 20 92 12-13 121-93-12ZM75 34l68 9-9 94-68-8Z"/><path d="m69 114 17-20 18 13 15-21 17 30"/><circle cx="94" cy="64" r="7"/><ellipse cx="110" cy="170" rx="75" ry="18"/><path d="M35 170v20c0 24 150 24 150 0v-20M43 191v10c0 22 134 22 134 0v-10M57 166v-24m109 23v-22m-63 34h15v13h-15Z"/><ellipse cx="110" cy="207" rx="80" ry="17"/><circle cx="110" cy="205" r="9"/><path d="M105 205h10m-5-5v10"/></>:<><path d="m39 70 125-25 26 143-125 24ZM41 76l81 55 54-79M66 206l40-77m82 54-51-57M64 49l86-17 3 16"/><path d="m79 81 54-10m-47 23 39-8"/></>}
 <path d="M22 224h176M18 31h18m-9-9v18M187 206h16m-8-8v16" opacity=".35"/>
 </svg>
}
export const artifactRecords=[
 {kind:'milk-tea',material:'塑料 · 密封薄膜',date:'约公元 2026 年',notes:['含有黑色球体','高糖度残留','曾被大量携带']},
 {kind:'airpods-max',material:'金属 · 织物',date:'约公元 2026 年',notes:['双耳对称结构','内置声学部件','用途尚存争议']},
 {kind:'photo-projector',material:'金属 · 玻璃镜片',date:'约公元 2026 年',notes:['使用光线放大影像','反复播放静止画面','保存过去的瞬间']},
];
