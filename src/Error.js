class AwesomeWorkerLoaderError extends Error {
  constructor(message) {
    super(message);

    this.name = 'Awesome Worker Loader Error';
    this.stack = false;
  }
}

export default AwesomeWorkerLoaderError;
