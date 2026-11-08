// @vitest-environment jsdom
import React from 'react';
import {it,expect,vi} from 'vitest';
import {render,screen,cleanup} from '@testing-library/react';
import LazyModelViewer from './LazyModelViewer';
vi.mock('./ModelViewer',()=>{throw Error('simulated 3D chunk unavailable')});
it('contains a 3D code loading failure and leaves the surrounding game operable',async()=>{
 const log=vi.spyOn(console,'error').mockImplementation(()=>{});
 try{render(<><button>继续考古</button><LazyModelViewer kind="milk-tea"/></>);expect(await screen.findByRole('status')).toBeTruthy();expect(screen.getByRole('img',{name:'珍珠奶茶杯临时复原图'})).toBeTruthy();expect(screen.getByRole('button',{name:'继续考古'})).toBeTruthy()}finally{cleanup();log.mockRestore()}
});
