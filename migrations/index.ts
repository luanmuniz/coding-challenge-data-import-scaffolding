
const Postgrator = require('postgrator')
import * as conf from '../src/server/conf'
const postgrator = new Postgrator({
  migrationDirectory: __dirname,
  migrationPattern: __dirname + '/*.sql',
  connectionString: conf.DATABASE_URL,
  ssl: conf.IS_PRODUCTION,
  driver: 'pg'
})

postgrator
  .migrate()
  .then((appliedMigrations:any) => console.log(appliedMigrations))
  .catch((error:any) => {
    console.log(error)
    console.log(error.appliedMigrations)
  })
