import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  username: z.string()
})

export default zodResolver(schema)
