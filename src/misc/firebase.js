import { Notification as Toast } from 'rsuite';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported, onMessage } from 'firebase/messaging';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { isLocalhost } from './helpers';

const config = {
  apiKey: 'AIzaSyDo9uxI4UPbYQOcdWgA2D_I71IfTPxR6LI',
  authDomain: 'chat-web-app-29931.firebaseapp.com',
  projectId: 'chat-web-app-29931',
  storageBucket: 'chat-web-app-29931.appspot.com',
  messagingSenderId: '484788758181',
  appId: '1:484788758181:web:661665a816441a5f42cf4c',
};

export const fcmVapidKey =
  'BE2h2hFGP5y63LrbGZk5oiDc2P0EgDXSR6c2c9Rh4cTHD3KwZNyV1gKwUSAYB9aaQKv0TQWpq1Cu1Ci225GSH-M';

const app = initializeApp(config);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'europe-west3');

export const messaging = isSupported() ? getMessaging(app) : null;

if (messaging) {
  onMessage(messaging, ({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
}

if (isLocalhost) {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
