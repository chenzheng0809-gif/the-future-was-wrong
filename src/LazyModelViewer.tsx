import {lazy,Suspense} from 'react';
const Viewer=lazy(()=>import('./ModelViewer'));
export default function LazyModelViewer(props:{kind:string;awakening?:boolean}){return <Suspense fallback={<div className="viewer model-loading"><small>正在启动文物查看器……</small></div>}><Viewer {...props}/></Suspense>}
