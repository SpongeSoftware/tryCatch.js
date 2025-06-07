"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatchSync = exports.tryCatch = void 0;
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
const tryCatch = async (promise) => {
    try {
        const result = await promise;
        return {
            data: result,
            error: null,
            success: true
        };
    }
    catch (error) {
        return {
            data: null,
            error: error,
            success: false
        };
    }
};
exports.tryCatch = tryCatch;
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
const tryCatchSync = (callback) => {
    try {
        const result = callback();
        return {
            data: result,
            error: null,
            success: true
        };
    }
    catch (error) {
        return {
            data: null,
            error: error,
            success: false
        };
    }
};
exports.tryCatchSync = tryCatchSync;
