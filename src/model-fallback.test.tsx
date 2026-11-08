// @vitest-environment jsdom
import React from 'react';
import {it,expect,vi} from 'vitest';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import ModelViewer from './ModelViewer';
import {assets} from './assets';
const state=vi.hoisted(()=>({attempts:0,clear:vi.fn()}));
vi.mock('@react-three/fiber',()=>({Canvas:({children}:{children:React.ReactNode})=><div>{children}</div>,useFrame:()=>{}}));
vi.mock('@react-three/drei',()=>({Center:({children}:{children:React.ReactNode})=><>{children}</>,OrbitControls:()=>null,useProgress:()=>({progress:0}),useGLTF:Object.assign(()=>{state.attempts++;throw Error('simulated missing GLB')},{clear:state.clear})}));
it('shows a nonblocking Dr. Wrong placeholder and retries the real loader after failure',()=>{const log=vi.spyOn(console,'error').mockImplementation(()=>{});render(<ModelViewer kind="dr-wrong" awakening/>);expect(screen.getByRole('img',{name:'Dr. Wrong 角色轮廓占位'})).toBeTruthy();const before=state.attempts;fireEvent.click(screen.getByRole('button',{name:/重试加载模型/}));expect(state.clear).toHaveBeenCalledWith(assets.drWrong);expect(state.attempts).toBeGreaterThan(before);expect(screen.getByRole('img')).toBeTruthy();cleanup();log.mockRestore()});
