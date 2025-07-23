![tryCatch.js Logo](assets/logo.png)

# @spongesoftware/trycatch

[![npm version](https://badge.fury.io/js/%40spongesoftware%2Ftrycatch.svg)](https://www.npmjs.com/package/@spongesoftware/trycatch)
[![Build Status](https://github.com/spongesoftware/trycatch.js/actions/workflows/ci.yml/badge.svg)](https://github.com/spongesoftware/trycatch.js/actions/workflows/ci.yml)
![GitHub License](https://img.shields.io/github/license/spongesoftware/trycatch.js?style=flat-square)
![GitHub branch check runs](https://img.shields.io/github/check-runs/spongesoftware/trycatch.js/main?style=flat-square)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/spongesoftware/trycatch.js?style=flat-square)

Simplify try catch handling in JS/TS with explicit error management using discriminated union types.

## 🚀 Installation

Install with npm:

```bash
npm install @spongesoftware/trycatch
```

Or with yarn:

```bash
yarn add @spongesoftware/trycatch
```

Or with pnpm:

```bash
pnpm add @spongesoftware/trycatch
```

## 📋 Requirements

- **Node.js**: >=20.0.0
- **npm**: >=9.0.0
- **pnpm**: >=8.0.0

## 🛠️ Features

- ✅ **TypeScript support** with full type safety
- ✅ **Dual module support** (CommonJS and ESM)
- ✅ **Zero dependencies** (runtime)
- ✅ **Explicit error handling** without throwing exceptions
- ✅ **Discriminated union types** for type-safe error management
- ✅ **Support for both sync and async operations**

## 📖 Usage

Both `tryCatch` (for Promises) and `tryCatchSync` (for synchronous functions) return a `Promise<Result>` or `Result` object respectively. The `Result` type is a discriminated union with three properties: `data`, `error`, and `success`.

*   If the operation succeeds: `success` will be `true`, `data` will contain the result, and `error` will be `null`.
*   If the operation fails: `success` will be `false`, `error` will contain the caught exception, and `data` will be `null`.

This pattern allows for explicit error handling without throwing exceptions.

### `tryCatch`: For Asynchronous Operations (Promises)

Wraps an async operation in a try-catch block and returns a `Promise<Result>`.

```typescript
import { tryCatch } from "@spongesoftware/trycatch"

// Example: TypeScript with explicit generics
interface User {
  id: number
  name: string
}

async function fetchUserById(userId: number) {
  const { data, error, success } = await tryCatch<User, Error>(
    fetch(`https://api.example.com/users/${userId}`).then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      return res.json()
    })
  )

  if (success) {
    console.log("User fetched:", data.name) // data is of type User
    return data
  } else {
    console.error("Failed to fetch user:", error.message) // error is of type Error
    return null
  }
}

fetchUserById(123)

// Example: Inferred types for a simple API call
async function runAsyncExample() {
  const { data, error, success } = await tryCatch(async () => {
    await new Promise((resolve) => setTimeout(resolve, 100))
    if (Math.random() > 0.5) {
      throw new Error("Asynchronous operation failed")
    }
    return "Asynchronous success!"
  })

  if (success) {
    console.log("Async operation data:", data)
  } else {
    console.error("Async operation error:", error.message)
  }
}

runAsyncExample()
```

### `tryCatchSync`: For Synchronous Operations

Wraps a synchronous operation in a try-catch block and returns a `Result` object directly.

```typescript
import { tryCatchSync } from "@spongesoftware/trycatch"

// Example: TypeScript with explicit generics
interface AppConfig {
  apiUrl: string
  timeoutMs: number
}

const configString = '{"apiUrl": "/api", "timeoutMs": 5000}'

const { data, error, success } = tryCatchSync<AppConfig, SyntaxError>(() => {
  const parsed = JSON.parse(configString)
  if (typeof parsed.timeoutMs !== "number") {
    throw new SyntaxError("timeoutMs must be a number")
  }
  return parsed as AppConfig
})

if (success) {
  console.log("Config loaded:", data.apiUrl, data.timeoutMs) // data is of type AppConfig
} else {
  console.error("Failed to parse config:", error.message) // error is of type SyntaxError
}

// Example: Inferred types
const jsonString = '{"value": 123}'

const { data: parsedData, error: parseError, success: parseSuccess } =
  tryCatchSync(() => JSON.parse(jsonString))

if (parseSuccess) {
  console.log("Parsed synchronous data:", parsedData)
} else {
  console.error("Synchronous parse error:", parseError.message)
}
```

## 📚 API Reference

### `tryCatch<T, E>(promise: Promise<T>): Promise<Result<T, E>>`

Wraps a Promise in a try-catch block and returns a Promise that resolves to a Result.

**Type Parameters:**

- `T` - The type of the successful result (defaults to `unknown`)
- `E` - The type of the error (defaults to `Error`)

**Parameters:**

- `promise` - The Promise to execute and handle

**Returns:** A Promise that resolves to either a Success or Failure result

### `tryCatchSync<T, E>(callback: () => T): Result<T, E>`

Wraps a synchronous function in a try-catch block and returns a Result.

**Type Parameters:**

- `T` - The type of the successful result (defaults to `unknown`)
- `E` - The type of the error (defaults to `Error`)

**Parameters:**

- `callback` - The synchronous function to execute and handle

**Returns:** Either a Success or Failure result

### `Result<T, E>`

A discriminated union type representing either a successful or failed operation.

**Success Type:**

```typescript
interface Success<T> {
  data: T
  error: null
  success: true
}
```

**Failure Type:**

```typescript
interface Failure<E> {
  data: null
  error: E
  success: false
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## 👨‍💻 Author

**Andrew Brunker** - [andrew@brunker.net.au](mailto:andrew@brunker.net.au)

## 📄 License

This project is licensed under the Apache-2.0 License - see the [LICENSE.md](LICENSE.md) file for details.
