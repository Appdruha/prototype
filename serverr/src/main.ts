import { NestFactory } from '@nestjs/core'
import { AppModule } from './app-module'

async function start() {
  const PORT = 5000
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
  })

  await app.listen(PORT, () => console.log(`server started on port ${PORT}`))
}

start()
