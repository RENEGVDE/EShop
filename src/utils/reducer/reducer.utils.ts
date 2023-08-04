export interface IAction<T> {
  type: T;
}

export interface IActionWithPayload<T, P> extends IAction<T> {
  type: T;
  payload: P;
}

export function createAction<T extends string, P>(
  type: T,
  payload: P
): IActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): IAction<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

// export const createAction = (type, payload) => ({ type, payload });
