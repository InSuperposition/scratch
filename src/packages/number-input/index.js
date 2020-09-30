import React, {forwardRef} from 'react'
import cn from 'classnames'
import {string} from 'prop-types'

const NumberInput = forwardRef(function NumberInput(
  // React Props
  {className, ...props},
  // ref is not a component prop
  ref
) {
  const rootClass = cn('number-input__root', className)

  return <input {...props} className={rootClass} type="number" ref={ref} />
})

NumberInput.propTypes = {
  className: string,
  defaultValue: string
}

export default NumberInput
