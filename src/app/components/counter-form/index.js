import React from 'react'
import {useForm} from 'react-hook-form'
import NumberInput from '../../../packages/number-input'
// import PropTypes from 'prop-types'
// import resolver from './schema.js'

export default function CounterForm() {
  const {register, handleSubmit} = useForm({
    // resolver
  })

  function onSubmit(data, e) {
    console.log(data, e)
  }
  function onError(errors, e) {
    console.log(errors, e)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <label>Test</label>
      <input name="name" ref={register} />
      <NumberInput name="age" ref={register} />
      <input type="submit" />
    </form>
  )
}
