module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit)
  require('shipit-shared')(shipit);

  shipit.initConfig({
    shared: {
      files: [
        {
          path: 'config/production.js',
          overwrite: false,
          chmod: '755',
        }
      ],
    },    
    default: {
      deployTo: '/home/deploy/projects/nkan',
      repositoryUrl: 'https://github.com/edlvj/nkan',
    },
    staging: {
      servers: 'deploy@18.195.216.164',
    },
  });

  shipit.blTask('start_server', function () {
      return shipit.remote( "cd /home/deploy/projects/nkan/current && forever start app.js");
  });

  shipit.blTask('npm_install', function () {
      return shipit.remote( "cd /home/deploy/projects/nkan/current && npm install");
  });

  shipit.on('deployed', function () {
      console.log("Deployed !");
      shipit.start('npm_install');
  });
}