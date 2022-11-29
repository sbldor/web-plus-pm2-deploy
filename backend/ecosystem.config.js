const dotenev = require('dotenv');

dotenev.config({ path: '.env.deploy' });
const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
  DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/app.js',
  }],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/backend/source/backend/`,
      'post-deploy': 'cd ~/web-plus-pm2-deploy/backend/source/backend/ && npm i && npm run build && pm2 restart ecosystem.config.js',
    },
  },
};
