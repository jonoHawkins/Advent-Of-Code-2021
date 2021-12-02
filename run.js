const nodemon = require('nodemon');

nodemon({ script: 'index.js', ext: 'js txt' })
  .on('start', console.clear)
  .on('restart', console.clear)
  .on('quit', () => {
    console.log('App has quit');
    process.exit();
  });