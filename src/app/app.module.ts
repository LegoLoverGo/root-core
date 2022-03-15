import { BaseModule, css, Module } from '../core';

import { AppComponent } from './app.component';

@Module({
  bootstrap: AppComponent,
  components: [AppComponent],
  globalStyle: css`
    @import url('https://fonts.googleapis.com/css2?family=PT+Sans&display=swap');

    :root {
      --primary: #4CC4C1;
    }

    * {
      margin: 0;
      padding: 0;

      font-family: 'PT Sans', sans-serif;
    }
  `,
})
export class AppModule extends BaseModule {}
