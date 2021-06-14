import { v4 as uuidv4 } from 'uuid'

export const validHeaders = {
  date: '2016-02-03T10:00:00.000+07:00',
  'x-trace-id': uuidv4()
}

export const invalidHeaders = {
  date: '28-01-2020 10:14'
}
