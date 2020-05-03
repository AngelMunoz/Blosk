import './main.css';
import Aurelia from 'aurelia';
import { BlsApp } from './bls-app';
import { BlsAppStore } from './stores/BlsAppStore';
import * as globalComponents from './components/global';

Aurelia
  .register(globalComponents)
  .register(BlsAppStore)
  .app(BlsApp)
  .start();
