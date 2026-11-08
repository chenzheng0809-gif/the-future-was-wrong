// @vitest-environment jsdom
import React from 'react';
import {afterEach,it,expect,vi} from 'vitest';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import ArtifactScene from './ArtifactScene';
vi.mock('./LazyModelViewer',()=>({default:({kind}:{kind:string})=><div data-testid="model">{kind}</div>}));
afterEach(cleanup);
it('keeps confirmation disabled until a choice is selected and changes selection before committing',()=>{
 const choose=vi.fn(),confirm=vi.fn();
 const view=render(<ArtifactScene index={0} choice={null} previous={[]} onChoose={choose} onConfirm={confirm}/>);
 const button=screen.getByRole('button',{name:/确认选择/}) as HTMLButtonElement;
 expect(button.disabled).toBe(true);fireEvent.click(button);expect(confirm).not.toHaveBeenCalled();
 fireEvent.click(screen.getByRole('button',{name:/^B\./}));expect(choose).toHaveBeenCalledWith(1);
 view.rerender(<ArtifactScene index={0} choice={1} previous={[]} onChoose={choose} onConfirm={confirm}/>);
 expect(button.disabled).toBe(false);expect(screen.getByRole('button',{name:/^B\./}).getAttribute('aria-pressed')).toBe('true');
 fireEvent.click(screen.getByRole('button',{name:/^A\./}));expect(choose).toHaveBeenLastCalledWith(0);
 fireEvent.click(button);expect(confirm).toHaveBeenCalledTimes(1);
});
it('switches the actual exhibit kind and retains the three progress slots',()=>{
 render(<ArtifactScene index={1} choice={null} previous={['CAT']} onChoose={()=>{}} onConfirm={()=>{}}/>);
 expect(screen.getByTestId('model').textContent).toBe('airpods-max');
 expect(screen.getByLabelText('考古进度 2 / 3').children.length).toBe(3);
 expect(screen.getByRole('heading',{name:'双耳金属装置'})).toBeTruthy();
});
