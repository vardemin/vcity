// A hook that logs service method before, after and error
const logger = require('winston');

module.exports = function () {
  return function (hook) {
    let message = `${hook.type}: ${hook.path} - Method: ${hook.method}`;

    if (hook.type === 'error') {
      message += `: ${hook.error.message}`;
    }

    logger.info(message);
    logger.info('hook.data', hook.data);
    logger.info('hook.params', hook.params);

    if (hook.result) {
      logger.info('hook.result', hook.result);
    }

    if (hook.error) {
      logger.info(hook.error);
    }
  };
};
