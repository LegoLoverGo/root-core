import { BaseComponent, ComponentPrototype } from './components';

interface ModuleOptions {
  components: ComponentPrototype[];
  bootstrap: ComponentPrototype;
  globalStyle: string;
}

export interface ModuleClass extends ModuleOptions {}

export class BaseModule implements ModuleClass {
  components = [];
  bootstrap = BaseComponent;
  globalStyle = '';
}

export function Module(options: ModuleOptions) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    return class extends target {
      components = options.components;
      bootstrap = options.bootstrap;
      globalStyle = options.globalStyle;
    };
  };
}
