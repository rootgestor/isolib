const { JSDOM } = require('jsdom');
const RegeneratorRuntime = require('regenerator-runtime/runtime');

const documentHTML = '<!doctype html><html><body></body></html>';
const dom = new JSDOM(documentHTML);
global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;

global.XMLHttpRequest = undefined;
