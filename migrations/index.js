
const Postgrator = require('postgrator')

const postgrator = new Postgrator({
  migrationDirectory: __dirname,
  migrationPattern: __dirname + '/*.sql',
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production',
  driver: 'pg'
})

postgrator
  .migrate()
  .then(appliedMigrations => console.log(appliedMigrations))
  .catch(error => {
    console.log(error)
    console.log(error.appliedMigrations)
  })
