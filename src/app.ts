import express, { Request, Response } from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/controller';
import { GithubSha256Middleware } from './presentation/middlewares';

(()=>{
  main();
})();

function main() {
  const app = express();
  const controller = new GithubController();
  app.use(express.json());
  app.use(GithubSha256Middleware.verfySignature);
  app.listen(envs.PORT,()=>console.log(`Server running on: ${envs.PORT}`));
  app.post('/api/github',controller.webhookHandler);
};