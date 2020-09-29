import React, {forwardRef} from 'react'
import cn from 'classnames'
import {string} from 'prop-types'

const NumberInput = forwardRef(function NumberInput(
  {className, ...props},
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
