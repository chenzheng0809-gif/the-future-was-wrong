// @vitest-environment jsdom
import React from 'react';
import {afterEach,it,expect,vi} from 'vitest';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import App from './App';
vi.mock('./LazyModelViewer',()=>({default:({kind}:{kind:string})=><div data-testid="model">{kind}</div>}));
afterEach(cleanup);
it('opens the archive, skips to artifact 001, preserves the full story and clears private memory',()=>{
 vi.spyOn(window,'scrollTo').mockImplementation(()=>{});render(<App/>);expect(screen.getByRole('heading',{name:/THE FUTURE/})).toBeTruthy();
 fireEvent.click(screen.getByRole('button',{name:/开启档案/}));expect(screen.getByText('「欢迎，首席考古学家。我是 Dr. Wrong。」')).toBeTruthy();fireEvent.click(screen.getByRole('button',{name:/跳过演出/}));expect(screen.getByRole('heading',{name:'未知液体容器'})).toBeTruthy();expect(document.activeElement).toBe(screen.getByRole('heading',{name:'未知液体容器'}));
 for(let i=0;i<3;i++){fireEvent.click(screen.getByRole('button',{name:/^A\./}));fireEvent.click(screen.getByRole('button',{name:/确认选择/}));}
 expect(window.scrollTo).toHaveBeenCalledWith(0,0);expect(screen.getByRole('heading',{name:'猫神·猫神·猫神共同体'})).toBeTruthy();fireEvent.click(screen.getByRole('button',{name:/发现未归档/}));fireEvent.click(screen.getByRole('button',{name:/我们该怎么处理/}));fireEvent.click(screen.getByRole('button',{name:/为它留白/}));fireEvent.click(screen.getByRole('button',{name:/保存这份决定/}));fireEvent.change(screen.getByRole('textbox'),{target:{value:'我一直记得，那天的阳光。'}});fireEvent.click(screen.getByRole('button',{name:'保存这段记忆'}));expect(screen.getByText('我一直记得，那天的阳光。')).toBeTruthy();expect(screen.getByRole('heading',{name:'猫神·猫神·猫神共同体'})).toBeTruthy();fireEvent.click(screen.getByRole('button',{name:'返回首页'}));expect(screen.getByRole('dialog')).toBeTruthy();fireEvent.click(screen.getByRole('button',{name:'继续探索'}));expect(screen.getByText('我一直记得，那天的阳光。')).toBeTruthy();fireEvent.click(screen.getByRole('button',{name:'返回首页'}));fireEvent.click(screen.getByRole('button',{name:'确认返回'}));expect(screen.queryByText('我一直记得，那天的阳光。')).toBeNull();
});
