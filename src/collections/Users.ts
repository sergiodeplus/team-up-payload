import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true, // Allows frontend to get user info if needed
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: false,
      defaultValue: 'Professor',
      label: 'Nome do Professor/Usuário',
    },
  ],
}
