// use `setTimeout` with async/await
function mockAsync(value, ms = 1000, ...args) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms, ...[value, ...args])
  })
}

export async function fetchCount(amount) {
  let amountResponse

  // try/catch/finally gotchas
  // - use `await` before calling async funcs, even after `return` statement
  // -
  try {
    // Mock async behavior
    // - `fetch` API req/res
    // - WebWorker (ok, maybe not... IE 10)
    amountResponse = await mockAsync(amount)

    throw new TypeError('bad code')

    console.log('fetchCount try:', amountResponse)
    // FIXME: if finally block has a `return` statment this is ignored
    return amountResponse

    // error handling is encouraged but not needed in all cases
  } catch (err) {
    // FIXME: not best way to use a switch,
    // could use if/else, ternary (but that indents code)
    // switch (true) {
    //   case err instanceof TypeError:
    //     console.error('Match error', err)
    //   // handle error, throw new error
    //   // break (but then error will not be thrown)
    //   default:
    //     // when using catch block, have a default case that throws
    //     throw err
    // }

    // another approach
    // TODO: check for BabelJS and IE compatibility
    // https://stackoverflow.com/a/36332700/1402195
    switch (err.constructor) {
      case TypeError:
        console.error('case TypeError', err)
        // handle error `throw`
        throw err
      default:
        // console.error('default case', err)
        // when using catch block, have a default case that throws
        throw err
    }

    // TODO: define error handling strategy as a team
  } finally {
    console.log('fetchCount finally:', amountResponse)
    // overrides returns in try and catch
    return amountResponse
  }
  // `finally` block has a `return` statement, leaving this block unreachable
}
