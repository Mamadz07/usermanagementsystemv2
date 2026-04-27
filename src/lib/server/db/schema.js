import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({autoIncrement: true}),
	nama: text('nama').notNull(),
	email: text('email').notNull(),
	alamat: text('alamat'),
	foto: text('foto')
});
