import { ModuleClass } from './modules'
import { CoreElement } from './react'

export function html(
  strings: TemplateStringsArray,
  ...args: (string | string[])[]
) {
  const newArgs = args.map((arg) => {
    if (typeof arg == 'string') return arg
    return arg.join('')
  })

  return strings
    .map((string, index) => {
      if (index == 0) return string
      return newArgs[index - 1] + string
    })
    .join('')
}

export { html as css }

function renderCoreElement(element: CoreElement): string {
  const children = element.props
    .children!.map((child) => renderCoreElement(child))
    .join('')

  let props: string[] = []
  for (const prop in element.props) {
    if (typeof prop != 'string') {
      props.push(`${prop}="${JSON.stringify(element.props[prop])}"`)
    }
  }

  return `<${element.type} ${props.join(' ')}></${element.type}>`
}

export function Mount(module: ModuleClass, element: Element) {
  const styleElement = document.createElement('style')
  styleElement.textContent = module.globalStyle
  document.head.appendChild(styleElement)

  module.components.forEach((component) => {
    const selector = component.selector!

    class CustomElement extends component {
      template: HTMLTemplateElement

      constructor() {
        super()

        this.attachShadow({ mode: 'open' })

        this.template = document.createElement('template')
        this.attributeChangedCallback()
      }

      attributeChangedCallback() {
        this.template.innerHTML =
          html`
            <style>
              ${module.globalStyle}
              ${this.styles}
            </style>
          ` + renderCoreElement(this.render())

        this.shadowRoot!.innerHTML = ''
        this.shadowRoot!.appendChild(this.template.content)
      }
    }

    customElements.define(selector, CustomElement)
  })

  const bootstrap = module.bootstrap
  const selector = bootstrap.selector!

  element.outerHTML = `<${selector}></${selector}>`
}
