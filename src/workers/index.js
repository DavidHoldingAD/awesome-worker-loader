/* eslint-disable multiline-ternary */
import path from 'path';
import { getWorkerConstructorName } from '../utils';

const getWorker = (file, content, options) => {
  const publicPath = options.publicPath
    ? JSON.stringify(options.publicPath)
    : '__webpack_public_path__';

  const publicWorkerPath = `${publicPath} + ${JSON.stringify(file)}`;

  if (options.inline) {
    const InlineWorkerPath = JSON.stringify(
      `!!${path.join(__dirname, 'InlineWorker.js')}`
    );

    const fallbackWorkerPath =
      options.fallback === false ? 'null' : publicWorkerPath;

    return `require(${InlineWorkerPath})(${JSON.stringify(
      content
    )}, ${fallbackWorkerPath})`;
  }

  const workerConstructorName = getWorkerConstructorName(options.type);

  return `new ${workerConstructorName}(${publicWorkerPath})`;
};

export default getWorker;
