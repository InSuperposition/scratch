import React, {useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {unwrapResult} from '@reduxjs/toolkit'
import {decrement, increment, incrementByAmount, asyncCount} from '../index.js'
import {getCount} from '../selectors.js'
import NumberInput from '../../../packages/number-input'
import {bool, string} from 'prop-types'
import cn from 'classnames'
import styles from './index.module.css'

CounterInputs.propTypes = {
  className: string,
  parentProp: bool.isRequired
}

export default function CounterInputs({className, parentProp = true}) {
  // for most cases of domain entities, useSelector should be preferred to read data from over Redux's store over `useStore` hook
  const count = useSelector(getCount)

  // Since refs don't trigger a render this may appear to be a 'bug'
  //  but its behaving correctly
  // FIXME: ref callback
  const numberInputElement = useRef(null)

  const numberInputAmount = Number(numberInputElement.current?.value ?? '0') // handles 'Infinity', '1e2', etc.

  // Redux for app and domain/entity specific components,
  // avoid on  components (reusable across projects, any component that uses DOM/BOM)
  const dispatch = useDispatch()

  // twitter.com/dan_abramov/status/1123380027230498816?lang=en
  // TODO: avoid using Redux's `bindActionCreators`, adds boilerplate to hooks

  // dispatch functions for Redux actions
  function handleDecrement() {
    dispatch(decrement())
  }

  function handleIncrement() {
    dispatch(increment())
  }

  // prefix function name with `use` to identify as hook
  // export default function useHookName() { ... }
  // const useHookName = function useHookName() { ... }

  function handleIncrementByAmount() {
    dispatch(incrementByAmount(numberInputAmount))
  }

  async function handleFetchCount() {
    let action, payload

    try {
      // https://github.com/redux-utilities/flux-standard-action
      action = await dispatch(asyncCount(numberInputAmount))
      console.log('try action', action, payload)

      // https://redux-toolkit.js.org/api/createAsyncThunk#unwrapping-result-actions
      // `unwrapResult` resolves to a FSA action with a `payload`
      // or rejects and then handled in `catch` block below.
      payload = await unwrapResult(action)
    } catch (err) {
      console.error(err)
      // forgetting to throw will swallow errors
      throw err
    } finally {
      console.log('finally', action, payload)
    }
  }

  // exmaple for naming conventions creating a reusable hook
  const useMyNewSideEffect = useEffect(
    // Use effect setup fns shoud never be declared as async
    function setupMyNewSideEffect() {
      // call async functions here

      return function cleanupMyNewSideEffect() {
        // add cleanup logic when needed
      }
    },
    []
  )

  // derived and memoized (useMemo)
  // ==============================

  // values from Redux store, this component's props,
  // children elements/components (useRef) and/or hooks like
  const derivedValue = count < 10 && numberInputAmount > 0 && parentProp

  // useMemo for 'expensive' comparisons that return a memoized value
  // const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])

  // class composition
  const rootClass = cn(styles.root, className)
  const rowClass = cn(styles.row, {
    'counter-inputs__row--active': derivedValue
  })

  return (
    <div className={rootClass}>
      <div className={rowClass}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={handleIncrement}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={handleDecrement}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <NumberInput
          ref={numberInputElement}
          defaultValue="2"
          className={styles.textbox}
          aria-label="Set increment amount"
        />
        <button className={styles.button} onClick={handleIncrementByAmount}>
          Add Amount
        </button>
        <button className={styles.asyncButton} onClick={handleFetchCount}>
          Add Async
        </button>
      </div>
      <b>Derived value: {String(derivedValue)}</b>
      <div>
        {count} {numberInputAmount} {String(parentProp)}
      </div>
    </div>
  )
}
