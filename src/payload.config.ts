import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Reservations } from './collections/Reservations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const frontendUrls = [
  'http://localhost:3001',
  'http://127.0.0.1:3001',
  'http://localhost:5173',
  process.env.FRONTEND_URL || '',
  'https://team-up-payload.vercel.app',
  'https://escola-reservas.surge.sh',
].filter(Boolean)

export default buildConfig({
  cors: frontendUrls,
  csrf: frontendUrls,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Reservations],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '99b3fd9b1d19edfa2b4f8ce4',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: process.env.DATABASE_URL?.startsWith('postgres')
    ? postgresAdapter({
      pool: {
        connectionString: process.env.DATABASE_URL,
        max: 10,
        ssl: { rejectUnauthorized: false },
      },
      push: true,
    })
    : sqliteAdapter({
      client: {
        url: process.env.DATABASE_URL || 'file:./team-up-payload.db',
      },
    }),
  sharp,
  plugins: [],
})
