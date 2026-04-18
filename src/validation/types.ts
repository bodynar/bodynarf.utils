/** Result of a single validator invocation */
export type ValidationResult = {
    /** Whether the value passed validation */
    readonly valid: boolean;

    /** Error message when `valid` is `false`; `undefined` when valid */
    readonly message: string | undefined;
};

/**
 * A function that validates a value of type `T`.
 * Returns a `ValidationResult` indicating whether the value is valid.
 *
 * @template T - Type of the value being validated.
 */
export type Validator<T> = (value: T) => ValidationResult;

/** Convenience factory: returns a passing `ValidationResult` */
export const validResult: ValidationResult = { valid: true, message: undefined };

/** Convenience factory: returns a failing `ValidationResult` with the given message */
export const invalidResult = (message: string): ValidationResult => ({ valid: false, message });
