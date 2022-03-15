interface ComponentOptions {
  selector: string
}

export interface ComponentClass extends HTMLElement {
  _internal?: ComponentOptions

  styles: string
  render: () => string
}

export class BaseComponent extends HTMLElement implements ComponentClass {
  _internal?: ComponentOptions

  styles = ''
  render() {
    const selector = this._internal!.selector
    throw new Error(`${selector}#render() not defined`)
    return ''
  }
}

export interface ComponentPrototype {
  new (): ComponentClass
  selector?: string
}

export function Component(options: ComponentOptions) {
  return function (target: ComponentPrototype) {
    target.prototype._internal = options
    target.selector = options.selector
  }
}

export function Property(
  target: ComponentClass,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const name = descriptor.value()

  descriptor.value = function (this: ComponentClass) {
    return this.getAttribute(name)
  }
}
