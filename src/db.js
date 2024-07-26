import { Level } from 'level'

// get location, relative to top-level from env-var, default to .db/
export const DATABASE_LOCATION = new URL(process.env.DATABASE_LOCATION||'.db/', import.meta.url + '/../../').pathname

// there are lots of options for backends
// https://github.com/Level/awesome
const db = new Level(DATABASE_LOCATION, { valueEncoding: 'json', keyEncoding: 'utf8' })
export default db
