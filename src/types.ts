/** Type without value or non initialized */
export type Nullish = null | undefined;

/**
 * Concrete type or `null` or `undefined`
 * @template T Concrete type
 */
export type Nullable<T> = T | Nullish;

/**
 * Merge of two types.
 * In case of duplicate keys type TStrong keys will overwrite TWeak keys
 * @template TWeak Type with keys, which can be overwritten in case of duplicate
 * @template TStrong Type with keys, which will overwrite keys from TWeak type in case of duplicate
 */
export type Merge<TStrong, TWeak> = TStrong & Omit<TWeak, keyof TStrong>;

/**
 * Concrete type or `undefined`
 * @template TWrapped Concrete type
 */
export type Optional<TWrapped> = TWrapped | undefined;

/**
 * Simple function with 1 out parameter and 0 input parameters
 */
export type SimpleFn<TResult> = () => TResult;

/** Simple function with 0 in\out parameters */
export type ActionFn = SimpleFn<void>;

/** Simple asynchronous function with 0 in\out parameters */
export type ActionFnAsync = SimpleFn<Promise<void>>;
