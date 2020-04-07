export function getWorkerConstructorName(workerType) {
  workerType = workerType || 'dedicated';

  const workerTypes = (type) => ({
    'dedicated': 'Worker',
    'shared': 'SharedWorker',
  })[type];

  return workerTypes(workerType);
}
