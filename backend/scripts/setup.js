import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { query } from '../src/utils/db.js'

dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function runSqlFile(filename) {
  const sql = fs.readFileSync(path.join(__dirname, '..', 'db', filename), 'utf-8')
  await query(sql)
}

async function main() {
  try {
    console.log('Applying schema...')
    await runSqlFile('schema.sql')
    console.log('Applying seed data...')
    await runSqlFile('seed.sql')
    console.log('Database setup completed.')
    process.exit(0)
  } catch (error) {
    console.error('Setup failed:', error)
    process.exit(1)
  }
}

main()
