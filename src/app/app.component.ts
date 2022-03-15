import { BaseComponent, Component, html } from '../core'

@Component({
  selector: 'app-main',
})
export class AppComponent extends BaseComponent {
  render() {
    return html`
      <app-header brandname="test"></app-header>
      <h1>Hello, World!</h1>
    `
  }
}
