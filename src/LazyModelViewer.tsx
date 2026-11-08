import {Component,lazy,Suspense,type ReactNode} from 'react';
import ModelFallback from './ModelFallback';
const Viewer=lazy(()=>import('./ModelViewer'));
class ViewerBoundary extends Component<{kind:string;children:ReactNode},{failed:boolean}>{
 state={failed:false};static getDerivedStateFromError(){return {failed:true}}
 render(){return this.state.failed?<div className="viewer"><ModelFallback kind={this.props.kind}/><div className="model-error" role="status">3D 查看器暂时不可用，仍可继续考古。</div></div>:this.props.children}
}
export default function LazyModelViewer(props:{kind:string;awakening?:boolean}){return <ViewerBoundary key={props.kind} kind={props.kind}><Suspense fallback={<div className="viewer model-loading"><small>正在启动文物查看器……</small></div>}><Viewer {...props}/></Suspense></ViewerBoundary>}
