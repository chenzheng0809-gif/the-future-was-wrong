// @vitest-environment jsdom
import React from 'react';
import {afterEach,describe,it,expect,vi} from 'vitest';
import {render,screen,fireEvent,act,cleanup} from '@testing-library/react';
import DrWrongAwakening from './DrWrong';
import {awakeningLines} from './assets';
vi.mock('./LazyModelViewer',()=>({default:()=> <div>Model viewer</div>}));
afterEach(()=>{cleanup();vi.useRealTimers()});
describe('Dr. Wrong awakening',()=>{
 it('shows the three exact lines in sequence, then enters archaeology at 7.6s',()=>{vi.useFakeTimers();const done=vi.fn();render(<DrWrongAwakening onComplete={done}/>);expect(screen.getByText(`「${awakeningLines[0]}」`)).toBeTruthy();act(()=>vi.advanceTimersByTime(2400));expect(screen.getByText(`「${awakeningLines[1]}」`)).toBeTruthy();act(()=>vi.advanceTimersByTime(2400));expect(screen.getByText(`「${awakeningLines[2]}」`)).toBeTruthy();expect(done).not.toHaveBeenCalled();act(()=>vi.advanceTimersByTime(2800));expect(done).toHaveBeenCalledTimes(1)});
 it('can skip immediately without waiting for the GLB',()=>{const done=vi.fn();render(<DrWrongAwakening onComplete={done}/>);fireEvent.click(screen.getByRole('button',{name:/跳过演出/}));expect(done).toHaveBeenCalledTimes(1)});
 it('cancels scheduled scene changes when leaving the scene',()=>{vi.useFakeTimers();const done=vi.fn();const view=render(<DrWrongAwakening onComplete={done}/>);view.unmount();act(()=>vi.advanceTimersByTime(10000));expect(done).not.toHaveBeenCalled()});
});
