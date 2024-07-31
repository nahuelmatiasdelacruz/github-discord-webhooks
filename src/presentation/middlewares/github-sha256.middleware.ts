import { NextFunction, Request, Response } from 'express';
import * as crypto from 'crypto';
import { envs } from '../../config';

const WEBHOOK_SECRET: string = envs.SECRET_TOKEN;

const verify_signature = (req: Request) => {
  try {
    const signature = crypto.createHmac('sha256', WEBHOOK_SECRET).update(JSON.stringify(req.body)).digest('hex');
    const hubSignature = req.header('x-hub-signature-256') ?? '';
    const trusted = Buffer.from(`sha256=${signature}`, 'ascii');
    const untrusted = Buffer.from(hubSignature, 'ascii');
    return crypto.timingSafeEqual(trusted, untrusted);
  } catch (e) {
    return false;
  };
};

export class GithubSha256Middleware {
  static verfySignature = async (req: Request,res: Response,next: NextFunction) => {
    if (!verify_signature(req)) return res.status(401).send('Unauthorized');
    next();
  };
};
