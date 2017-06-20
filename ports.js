'use strict';
const Elm = require('./elm.js');

const domNode = document.getElementById('container');
const app = Elm.Main.embed(domNode);