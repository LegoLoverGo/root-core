import { BaseComponent, Component, html } from '../core';

@Component({
  selector: 'app-main',
})
export class AppComponent extends BaseComponent {
  render() {
    return html`
      <h1>Hello, World!</h1>
    `;
  }
}
