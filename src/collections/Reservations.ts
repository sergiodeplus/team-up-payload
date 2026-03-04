import type { CollectionConfig } from 'payload'

export const Reservations: CollectionConfig = {
    slug: 'reservations',
    admin: {
        useAsTitle: 'professor_name',
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'professor_name',
            type: 'text',
            required: true,
            label: 'Professor',
        },
        {
            name: 'equipment_type',
            type: 'text',
            required: true,
            label: 'Equipamento',
        },
        {
            name: 'date',
            type: 'text',
            required: true,
            label: 'Data (YYYY-MM-DD)',
        },
        {
            name: 'start_time',
            type: 'text',
            required: true,
            label: 'Hora de Início',
        },
        {
            name: 'end_time',
            type: 'text',
            required: true,
            label: 'Hora de Fim',
        },
        {
            name: 'subject',
            type: 'text',
            label: 'Disciplina',
        },
        {
            name: 'class_name',
            type: 'text',
            label: 'Turma',
        },
    ],
}
