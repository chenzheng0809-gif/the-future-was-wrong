// @vitest-environment jsdom
import React from 'react';
import {afterEach,it,expect,vi} from 'vitest';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import App from './App';
import {artifacts} from './game';
vi.mock('./LazyModelViewer',()=>({default:({kind}:{kind:string})=><div data-testid="model">{kind}</div>}));
afterEach(()=>{cleanup();vi.restoreAllMocks()});
it.each(['写进历史','为它留白','寻找他们的故事'])('%s still reaches private memory, can skip it, and preserves civilization',branch=>{
 vi.spyOn(window,'scrollTo').mockImplementation(()=>{});render(<App/>);
 fireEvent.click(screen.getByRole('button',{name:/开启档案/}));fireEvent.click(screen.getByRole('button',{name:/跳过演出/}));
 for(let i=0;i<3;i++){
  const options=screen.getByRole('group',{name:'你认为，它真正的用途是什么？'});
  expect(options.textContent).not.toMatch(/猫咪文明|海洋文明|菌菇文明|机械文明|打工人文明/);
  if(i===2){expect(screen.getByTestId('model').textContent).toBe('photo-projector');expect(screen.getByRole('heading',{name:artifacts[2].name})).toBeTruthy()}
  fireEvent.click(screen.getByRole('button',{name:/^A\./}));fireEvent.click(screen.getByRole('button',{name:/确认选择/}));
 }
 fireEvent.click(screen.getByRole('button',{name:/继续调查/}));fireEvent.click(screen.getByRole('button',{name:'翻看照片背面'}));expect(screen.getByText('但是，我一直记得。')).toBeTruthy();fireEvent.click(screen.getByRole('button',{name:/我们该怎么处理/}));fireEvent.click(screen.getByRole('button',{name:new RegExp('^'+branch)}));fireEvent.click(screen.getByRole('button',{name:/保存这份决定/}));fireEvent.change(screen.getByRole('textbox',{name:'私人记忆'}),{target:{value:'这段草稿应该随跳过清除'}});fireEvent.click(screen.getByRole('button',{name:'不写下具体内容，继续'}));expect(screen.getByText('有些记忆，被留在心里。')).toBeTruthy();expect(screen.queryByText('这段草稿应该随跳过清除')).toBeNull();expect(screen.getByRole('heading',{name:'猫神·猫神·猫神共同体'})).toBeTruthy();
});
