// eslint-disable-next-line node/no-missing-import
import {createLogger, format, transports} from 'winston';
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import fs  from 'fs';
import { config } from './common/config';

const { LOG_LEVEL } = config;
let logLevel: string;

if (LOG_LEVEL === 0) {
  logLevel = 'error';
} else if (LOG_LEVEL === 1) {
  logLevel = 'info';
} else {
  logLevel = 'silly';
}


const logger = createLogger({ 
  level: logLevel,
  format: format.combine(
    format.colorize(),
    format.cli(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(
        format.uncolorize(),
        format.json()
      )
    }),
    new transports.File({
      filename: 'logs/info.log',
      level: 'info',
      format: format.combine(
        format.uncolorize(),
        format.json()
      )
    }),
  ]
});

export function logged(fastify: FastifyInstance): void {
  fastify.addHook('preHandler', (req: FastifyRequest, reply: FastifyReply, done: () => void) => {
    logger.silly(`REQUEST: method: ${req.method}, url: ${req.url}, body: ${JSON.stringify(req.body)}, queryParameters: ${JSON.stringify(req.query )}, RESPONSE: statusCode: ${reply.statusCode}`)
    done()
  })

  fastify.addHook('onResponse', (req: FastifyRequest, reply: FastifyReply, done: () => void) => {
    logger.info(`REQUEST: method: ${req.method}, url: ${req.url}, body: ${JSON.stringify(req.body)}, queryParameters: ${JSON.stringify(req.query)}, RESPONSE: statusCode: ${reply.statusCode}, responseTime: ${reply.getResponseTime().toFixed(3)}s`)
    done()
  })

  fastify.addHook('onError', (req: FastifyRequest, reply: FastifyReply, error: object, done: () => void) => {
    logger.error(JSON.stringify(error))
    done()
  })
}

process.on('uncaughtExceptionMonitor', (error) => {
  console.error(`captured error: ${error.message}`);
  fs.appendFileSync('error.log', `\n Captured error: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason: {message: string}) => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
  fs.appendFileSync('error.log', `\n Unhandled rejection detected: ${reason.message}`);
});

