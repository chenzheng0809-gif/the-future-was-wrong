import type {KeyboardEvent} from 'react';
/** Scoped to the focused choices; never intercepts typing in the memory card. */
export function navigateChoice(event:KeyboardEvent<HTMLElement>,selected:number|null,count:number,onChoose:(index:number)=>void){
 const buttons=Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button'));
 const focused=buttons.indexOf(event.target as HTMLButtonElement);
 if(focused<0||event.altKey||event.ctrlKey||event.metaKey)return;
 let next:number;
 if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(focused+1)%count;
 else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(focused-1+count)%count;
 else if(event.key==='Home')next=0;
 else if(event.key==='End')next=count-1;
 else if(/^[a-e]$/i.test(event.key)&&event.key.toUpperCase().charCodeAt(0)-65<count)next=event.key.toUpperCase().charCodeAt(0)-65;
 else return;
 event.preventDefault();if(next!==selected)onChoose(next);buttons[next]?.focus();
}
