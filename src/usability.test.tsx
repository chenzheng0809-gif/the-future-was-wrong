// @vitest-environment jsdom
import React from 'react';
import {afterEach,it,expect,vi} from 'vitest';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import {ArchiveDecisionScene,MemoryScene} from './NarrativeScenes';
import ArtifactScene from './ArtifactScene';
vi.mock('./LazyModelViewer',()=>({default:()=>null}));
afterEach(cleanup);
it('never archives the photo without an explicit choice',()=>{
 const confirm=vi.fn();const props={onChoose:vi.fn(),flipped:false,onFlip:vi.fn(),onContinue:confirm};
 const view=render(<ArchiveDecisionScene {...props} choice={null}/>);
 const save=screen.getByRole('button',{name:/保存这份决定/}) as HTMLButtonElement;
 expect(save.disabled).toBe(true);expect(screen.queryByRole('heading',{name:'被命名的下午'})).toBeNull();fireEvent.click(save);expect(confirm).not.toHaveBeenCalled();
 view.rerender(<ArchiveDecisionScene {...props} choice={2}/>);expect(save.disabled).toBe(false);fireEvent.click(save);expect(confirm).toHaveBeenCalledTimes(1);
});
it('supports keyboard choices without accidentally confirming',()=>{
 const choose=vi.fn(),confirm=vi.fn();render(<ArtifactScene index={0} choice={null} previous={[]} onChoose={choose} onConfirm={confirm}/>);
 const first=screen.getByRole('button',{name:/^A\./});first.focus();fireEvent.keyDown(first,{key:'ArrowDown'});expect(choose).toHaveBeenLastCalledWith(1);expect(document.activeElement).toBe(screen.getByRole('button',{name:/^B\./}));
 fireEvent.keyDown(document.activeElement!,{key:'End'});expect(choose).toHaveBeenLastCalledWith(4);expect(document.activeElement).toBe(screen.getByRole('button',{name:/^E\./}));expect(confirm).not.toHaveBeenCalled();
});
it('saves with the keyboard shortcut, but never while composing Chinese text',()=>{
 const save=vi.fn();render(<MemoryScene memory="" onChange={()=>{}} onSave={save} onSkip={()=>{}}/>);const input=screen.getByRole('textbox',{name:'私人记忆'});
 fireEvent.keyDown(input,{key:'Enter'});expect(save).not.toHaveBeenCalled();fireEvent.compositionStart(input);fireEvent.keyDown(input,{key:'Enter',ctrlKey:true});expect(save).not.toHaveBeenCalled();fireEvent.compositionEnd(input);fireEvent.keyDown(input,{key:'Enter',metaKey:true});expect(save).toHaveBeenCalledTimes(1);
});
