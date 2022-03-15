import { AppModule } from './app/app.module'
import { Mount } from './core'

Mount(new AppModule(), document.getElementById('app')!)
