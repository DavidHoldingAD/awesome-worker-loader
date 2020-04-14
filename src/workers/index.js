/* eslint-disable multiline-ternary */
import path from 'path';

export const WORKER_TYPES = {
  DEDICATED: 'dedicated',
  SHARED: 'shared',
  SERVICE: 'service',
};

const getWorker = (workerFilePath, content, options) => {
  const publicPath = options.publicPath
    ? JSON.stringify(options.publicPath)
    : '__webpack_public_path__';

  const publicWorkerPath = `${publicPath} + ${JSON.stringify(workerFilePath)}`;

  if (options.inline) {
    const fallbackWorkerPath = options.fallback ? publicWorkerPath : 'null';

    const inlineWorkerName = options.name || 'InlineWorker.js';
    const inlineWorkerCreateScript = getInlineWorkerCreateScript(
      inlineWorkerName,
      content,
      fallbackWorkerPath
    );
    return inlineWorkerCreateScript;
  }

  const workerCreateScript = getWorkerCreateScript(
    options.type,
    publicWorkerPath
  );
  return workerCreateScript;
};

const getInlineWorkerCreateScript = (name, content, fallbackWorkerPath) => {
  const inlineWorkerPath = JSON.stringify(`!!${path.join(__dirname, name)}`);

  return `require(${inlineWorkerPath})(${JSON.stringify(
    content
  )}, ${fallbackWorkerPath})`;
};

const getWorkerCreateScript = (type, publicWorkerPath) => {
  switch (type) {
    case WORKER_TYPES.SHARED: {
      return `new SharedWorker(${publicWorkerPath})`;
    }
    case WORKER_TYPES.SERVICE: {
      return `('serviceWorker' in navigator)
      ? navigator.serviceWorker.register(${publicWorkerPath}, options)
      : Promise.reject(
        new Error('navigator.serviceWorker is not supported in this browser')
      );`;
    }
    case WORKER_TYPES.DEDICATED:
    default: {
      return `new Worker(${publicWorkerPath})`;
    }
  }
};

export default getWorker;
