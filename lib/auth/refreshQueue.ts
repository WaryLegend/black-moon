type QueueItem = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

export const refreshQueue = {
  get isRefreshing() {
    return isRefreshing;
  },

  setRefreshing(value: boolean) {
    isRefreshing = value;
  },

  enqueue(item: QueueItem) {
    failedQueue.push(item);
  },

  process(error: unknown, token: string | null = null) {
    failedQueue.forEach(({ resolve, reject }) => {
      error ? reject(error) : resolve(token);
    });
    failedQueue = [];
  },
};
