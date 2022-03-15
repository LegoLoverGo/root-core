import { ModuleClass } from './modules';

export function html(strings: TemplateStringsArray, ...args: string[]) {
  return strings
    .map((string, index) => (index == 0 ? string : args[index - 1] + string))
    .join('');
}

export { html as css };

export function Mount(module: ModuleClass, element: Element) {
  module.components.forEach((component) => {
    const selector = component.selector!;

    const styleElement = document.createElement('style');
    styleElement.innerText = module.globalStyle;
    document.head.appendChild(styleElement);

    class CustomElement extends component {
      constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML =
          html`
          <style>
            ${module.globalStyle}
            ${this.styles}
          </style>
        ` + this.render();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.appendChild(template.content);
      }
    }

    customElements.define(selector, CustomElement);
  });

  const bootstrap = module.bootstrap;
  const selector = bootstrap.selector!;

  element.outerHTML = `<${selector}></${selector}>`;
}
