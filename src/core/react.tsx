export interface CoreElement {
  type: string
  props: {
    [name: string]: any
    children?: CoreElement[]
  }
}

export function createElement(
  type: string,
  props?: any[],
  ...children: (CoreElement | string)[]
): CoreElement {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        if (typeof child == 'object') return child
        return createTextElement(child)
      }),
    },
  }
}

function createTextElement(text: string) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  }
}
