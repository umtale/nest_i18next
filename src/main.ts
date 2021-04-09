// const i18next = require("i18next")
import './config';
import * as i18n from 'i18next';
import * as Backend from 'i18next-fs-backend';
import { NestFactory } from '@nestjs/core';
import { handle } from 'i18next-http-middleware';
import { AppModule } from './app.module';

async function bootstrap() {
  const i18next: any = i18n;
  const APP_LOCALES = process.env.APP_LOCALES?.split(', ') || ['en'];

  i18next.use(Backend).init({
    debug: false,
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
      addPath: 'locales/{{lng}}/{{ns}}.missing.json'
    },
    ns: 'common',
    defaultNS: 'common',
    fallbackLng: APP_LOCALES[0],
    preload: APP_LOCALES,
    saveMissing: true,
  });

  const app = await NestFactory.create(AppModule);

  
  app.use(handle(i18next))
  app.use((req: any, res: any, next: any) => {

    if (req.url) {
      for (let i = 0; i < APP_LOCALES.length; i++) {
        const locale = APP_LOCALES[i];
        const regex = new RegExp(`^/${locale}/`, 'i');

        if (req.url.search(regex) === 0) {
          req.i18n.changeLanguage(locale);
          break;
        }
      }
    }

    next();
  })

  await app.listen(3000);
}
bootstrap();
