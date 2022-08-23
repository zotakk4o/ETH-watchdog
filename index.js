const container = require('./container');
container.resolve('config');
const app = container.resolve('app');
app.start();

process.on('uncaughtException', (error, source) => {
    if (error.stack) {
        error = error.stack;
    }

    if (container && container.resolve) {
        container.resolve('logger').error(error);
        container.resolve('server').stop()
            .then(success => process.exit(0))
            .catch(err => process.exit(1))
    } else {
        console.log(error);
        process.exit(1);
    }
});
