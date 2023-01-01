export type Populative<T> = T & {
  populate?: { [key in keyof T]: 1 | undefined };
};
