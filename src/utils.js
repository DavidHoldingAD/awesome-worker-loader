export function getWorkerConstructorName(workerType) {
  const workerTypes = (type) =>
    ({
      dedicated: 'Worker',
      shared: 'SharedWorker',
    }[type]);

  return workerTypes(workerType || 'dedicated');
}
