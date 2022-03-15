import { BaseComponent, Component, css, html, Property } from '../core'

@Component({
  selector: 'app-header',
})
export class HeaderComponent extends BaseComponent {
  @Property
  brandname() {
    return 'brandname'
  }

  @Property
  pages() {
    return 'pages'
  }

  styles = css`
    header {
      display: flex;
      padding: 2mm;

      background-color: var(--primary);
    }

    nav {
      flex: 1 1 0%;

      display: flex;
      flex-direction: row-reverse;
    }

    ul {
      display: flex;
      list-style: none;
    }

    li {
      margin-left: 2mm;
    }
  `

  render() {
    const pageList = (this.pages() ?? '').split(',')

    return html`
      <header>
        <b>${this.brandname()}</b>
        <nav>
          <ul>
            ${pageList.map((page) => html`<li>${page}</li>`)}
          </ul>
        </nav>
      </header>
    `
  }
}
