/**
 * Represents a successful operation result.
 * @template T - The type of the successful data
 */
interface Success<T> {
  /** The successful result data */
  data: T
  /** Always null for successful operations */
  error: null
  /** Always true to indicate success */
  success: true
}

/**
 * Represents a failed operation result.
 * @template E - The type of the error
 */
interface Failure<E> {
  /** Always null for failed operations */
  data: null
  /** The error that occurred */
  error: E
  /** Always false to indicate failure */
  success: false
}

/**
 * A discriminated union type representing either a successful or failed operation.
 * This pattern eliminates the need for throwing exceptions and makes error handling explicit.
 * 
 * @template T - The type of the successful data (defaults to unknown)
 * @template E - The type of the error (defaults to Error)
 */
type Result<T = unknown, E = Error> = Success<T> | Failure<E>;

/**
 * Wraps an async operation in a try-catch block and returns a Result type.
 * This utility function prevents unhandled promise rejections and makes error handling explicit.
 * 
 * @template T - The type of the successful result (defaults to unknown)
 * @template E - The type of the error (defaults to Error)
 * @param promise - The promise to execute and handle
 * @returns A Promise that resolves to either a Success or Failure result
 *
 * @example
 * TypeScript with explicit generics:
 * ```ts
 * interface User {
 *   id: number;
 *   name: string;
 * }
 * 
 * const { data, error, success } = await tryCatch<User, string>(
 *   fetch('/api/user').then(res => res.json())
 * )
 * if (success) {
 *   console.log(data.name) // TypeScript knows data is User
 * } else {
 *   console.error(error) // TypeScript knows error is string
 * }
 * ```
 * 
 * @example
 * TypeScript with inferred types:
 * ```ts
 * const { data, error, success } = await tryCatch(fetch('/api/user'));
 * if (success) {
 *   console.log('Response:', data)
 * } else {
 *   console.error('Error:', error)
 * }
 * ```
 *
 * @example
 * JavaScript usage:
 * ```js
 * const result = await tryCatch(fetch('/api/user'));
 * if (result.success) {
 *   console.log('Response:', result.data);
 * } else {
 *   console.error('Error:', result.error);
 * }
 * ```
 */
export const tryCatch = async <T = unknown, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> => {
  try {
    const result = await promise
    return {
      data: result,
      error: null,
      success: true
    }
  } catch (error) {
    return {
      data: null,
      error: error as E,
      success: false
    }
  }
}

/**
 * Wraps a synchronous operation in a try-catch block and returns a Result type.
 * This utility function handles exceptions from synchronous code and makes error handling explicit.
 * 
 * @template T - The type of the successful result (defaults to unknown)
 * @template E - The type of the error (defaults to Error)
 * @param callback - The synchronous function to execute and handle
 * @returns Either a Success or Failure result
 *
 * @example
 * TypeScript with explicit generics:
 * ```ts
 * interface Config {
 *   apiUrl: string;
 *   timeout: number;
 * }
 * 
 * const { data, error, success } = tryCatchSync<Config, SyntaxError>(
 *   () => JSON.parse(configString) as Config
 * )
 * if (success) {
 *   console.log(data.apiUrl) // TypeScript knows data is Config
 * } else {
 *   console.error(error.message) // TypeScript knows error is SyntaxError
 * }
 * ```
 *
 * @example
 * TypeScript with inferred types:
 * ```ts
 * const { data, error, success } = tryCatchSync(() => JSON.parse(jsonString));
 * if (success) {
 *   console.log('Parsed data:', data)
 * } else {
 *   console.error('Parse error:', error)
 * }
 * ```
 *
 * @example
 * JavaScript usage:
 * ```js
 * const result = tryCatchSync(() => JSON.parse(jsonString));
 * if (result.success) {
 *   console.log('Parsed data:', result.data)
 * } else {
 *   console.error('Parse error:', result.error)
 * }
 * ```
 */
export const tryCatchSync = <T = unknown, E = Error>(
  callback: () => T
): Result<T, E> => {
  try {
    const result = callback()
    return {
      data: result,
      error: null,
      success: true
    }
  } catch (error) {
    return {
      data: null,
      error: error as E,
      success: false
    }
  }
}
