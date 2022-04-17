"use strict";

/* eslint-disable no-undef */

import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import app from '../server';
import { db, mdb } from '../config/database'


dotenv.config();
const httpServer = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (typeof port === 'number' && port >= 0) {
    // named pipe
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3009');
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log.info(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.info(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = async () => {
    console.log("ENV: "+ process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    console.log(`Server is listening on port ${port} `);
  }
  db.then(() => {
    console.log("database connected successfully");
  }).catch((err) => console.log(err + "database connection error"));
  
}

httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', onListening);
