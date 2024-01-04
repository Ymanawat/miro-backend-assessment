import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export function addSecurityHeaders(app: INestApplication): void {
  app.enableCors({
    exposedHeaders: ['set-cookie'],
  });
  app.use(helmet());
  app.use(helmet.referrerPolicy());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: [
          "'self'",
          'cdn.jsdelivr.net',
          'js.hs-analytics.net',
          'fonts.googleapis.com',
          'fonts.gstatic.com',
          'data:',
        ],
        styleSrc: [
          "'self'",
          "'unsafe-eval'",
          "'unsafe-inline'",
          'fonts.googleapis.com',
          'cdn.jsdelivr.net',
        ],
        scriptSrc: [
          "'self'",
          "'unsafe-eval'",
          "'unsafe-inline'",
          'cdn.jsdelivr.net',
        ],
        imgSrc: ['data:', 'blob:', "'self'"],
      },
    }),
  );
}
