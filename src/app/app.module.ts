import { BaseModule, Module } from '../core';

import { AppComponent } from './app.component';

@Module({
  bootstrap: AppComponent,
  components: [AppComponent],
})
export class AppModule extends BaseModule {}
