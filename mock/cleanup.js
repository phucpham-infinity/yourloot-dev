import { unlink } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dbPath = join(__dirname, 'wallet.db')

try {
  await unlink(dbPath)
  console.log('✅ Database cleaned up successfully')
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log('ℹ️  Database file does not exist')
  } else {
    console.error('❌ Error cleaning up database:', error.message)
  }
}
