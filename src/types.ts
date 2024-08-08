/** Type without value or non initialized */
export type Nullish = null | undefined;

/**
 * Merge of two types.
 * In case of duplicate keys type TStrong keys will overwrite TWeak keys
 * @template TWeak Type with keys, which can be overwritten in case of duplicate
 * @template TStrong Type with keys, which will overwrite keys from TWeak type in case of duplicate
 */
export type Merge<TWeak, TStrong> = TStrong & Omit<TWeak, keyof TStrong>;

/**
 * Concrete type or `undefined`
 * @template TWrapped Concrete type
 */
export type Optional<TWrapped> = TWrapped | undefined;
