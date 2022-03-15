import { BaseComponent, Component, css, html } from '../core'

@Component({
  selector: 'app-main',
})
export class AppComponent extends BaseComponent {
  styles = css`
    h1 {
      padding: 5mm;

      text-align: center;
    }
  `

  render() {
    return html`
      <app-header brandname="Placeholder" pages="Home,About"></app-header>
      <h1>Smash the JELLY!!!!</h1>
    `
  }
}
