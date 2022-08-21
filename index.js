const container = require('./container');
container.resolve('config');
const app = container.resolve('app');
app.start();