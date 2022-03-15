import { BaseComponent, Component, html, Property } from '../core';

@Component({
  selector: 'app-header',
})
export class HeaderComponent extends BaseComponent {
  @Property
  brandname() {
    return 'brandname';
  }

  render() {
    return html`
      ${this.brandname()}
    `;
  }
}
