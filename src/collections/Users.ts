import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true, // Allows frontend to get user info if needed
    create: ({ req: { user } }) => {
      if (!user) return false; // Prevent unauthenticated user creation (except first-user init which bypasses this)
      // Allow if admin or if role is undefined (to prevent locking out the current only user)
      return user.role === 'admin' || typeof user.role === 'undefined';
    },
    update: ({ req: { user }, id }) => {
      if (!user) return false;
      if (user.role === 'admin' || typeof user.role === 'undefined') return true;
      // If no id is passed (global check), allow true so they can see the edit button, but document-level will restrict them
      if (!id) return true;
      return user.id === id;
    },
    delete: ({ req: { user } }) => {
      if (!user) return false;
      return user.role === 'admin' || typeof user.role === 'undefined';
    },
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
    {
      name: 'role',
      type: 'select',
      label: 'Papel do Usuário',
      required: false, // Must be false so DB schema push doesn't fail on existing rows
      defaultValue: 'teacher',
      saveToJWT: true,
      options: [
        { label: 'Coordenadora (Admin)', value: 'admin' },
        { label: 'Professor', value: 'teacher' },
      ],
      access: {
        update: ({ req: { user } }) => {
          if (!user) return false;
          return user.role === 'admin' || typeof user.role === 'undefined';
        },
      },
    },
  ],
}
