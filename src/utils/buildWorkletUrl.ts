import { WorkerUrl } from 'worker-url';

const buildWorkletUrl = (path: string, name: string): URL => {
  return new WorkerUrl(new URL(path, import.meta.url), { name });
};

export { buildWorkletUrl };
