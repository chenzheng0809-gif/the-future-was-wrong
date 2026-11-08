import {it,expect,vi} from 'vitest';
import {Scene,Mesh,BoxGeometry,MeshBasicMaterial,Texture} from 'three';
import {retainModel} from './modelResources';
it('releases shared GPU resources once and tolerates immediate StrictMode remounts',()=>{
 vi.useFakeTimers();const scene=new Scene(),geometry=new BoxGeometry(),texture=new Texture(),material=new MeshBasicMaterial({map:texture});scene.add(new Mesh(geometry,material),new Mesh(geometry,material));
 const gd=vi.spyOn(geometry,'dispose'),md=vi.spyOn(material,'dispose'),td=vi.spyOn(texture,'dispose'),clear=vi.fn();
 const first=retainModel('test-scene',scene,clear);first();const second=retainModel('test-scene',scene,clear);vi.runAllTimers();expect(gd).not.toHaveBeenCalled();second();vi.runAllTimers();expect(gd).toHaveBeenCalledTimes(1);expect(md).toHaveBeenCalledTimes(1);expect(td).toHaveBeenCalledTimes(1);expect(clear).toHaveBeenCalledTimes(1);vi.useRealTimers();
});
