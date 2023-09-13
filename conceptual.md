### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  - Using **callbacks**: Functions that are passed as arguments and executed after an asynchronous operation completes.
  - Using **Promises**: Objects representing the eventual completion or failure of an asynchronous operation.
  - Using **async/await**: Syntax for writing asynchronous code that looks like synchronous code.
- What is a Promise?
  - A **Promise** is an object representing the eventual completion or failure of an asynchronous operation. It has states (pending, fulfilled, or rejected) and can be chained with `.then()` and `.catch()` to handle the result or error.

- What are the differences between an async function and a regular function?
  - An **async function** returns a **Promise** that resolves to the function's return value, while a regular function returns a value directly.
   - Inside an **async function**, you can use the `await` keyword to pause the execution and wait for a Promise to settle.
- What is the difference between Node.js and Express.js?
  - **Node.js** is a runtime environment that allows JavaScript to be used for server-side programming. It provides the runtime for executing JavaScript outside of a browser.
   - **Express.js** is a web application framework for Node.js. It simplifies the process of building web applications and APIs by providing a set of features and tools.
- What is the error-first callback pattern?
  - It's a convention in Node.js where callbacks are used to handle asynchronous operations. The first argument of the callback is reserved for an error object. If an error occurs, it will be passed as the first argument, otherwise, it will be `null`.
- What is middleware?
  - **Middleware** is a function that has access to the request and response objects in an Express application's request-response cycle. It can perform tasks, modify the request/response, or end the request-response cycle.
- What does the `next` function do?
  - In Express.js, `next` is a callback function that is used inside middleware to pass control to the next middleware function in the stack. It allows the execution of multiple middleware functions in a sequence.
- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
  - **Performance:** The API calls are made sequentially, which can be slow. It's better to make them concurrently using `Promise.all`.
  - **Naming:** Variable names like `elie`, `joel`, and `matt` should be more descriptive.
  - **Error handling:** There's no error handling for failed API calls.
  - **Error-first callback:** The provided code does not use the error-first callback pattern.


