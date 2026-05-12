import { createDb } from "$lib/server/db/db";
import { users } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const prerender = false;
export async function load({platform}) {
    if (!platform?.env) {
        return {users: []};
    }
  const db = createDb(platform.env);
  
    const data = await db.select().from(users);
    return { users: data };
};

export const actions = {
    create: async ({ request, platform }) => {
    if (!platform) return;

    const db = createDb(platform.env);

    const form = await request.formData();

    const nama = form.get('nama')?.toString();
    const email = form.get('email')?.toString();
    const alamat = form.get('alamat')?.toString();

    const file = form.get('foto');

    if (!nama || !email) {
        throw new Error("Nama dan Email wajib diisi");
    }

    let fotoPath = '';

    if (file && file.size > 0) {

        const buffer =
            Buffer.from(await file.arrayBuffer());

        const filename =
            `${uuidv4()}-${file.name}`;

        const uploadPath =
            path.join('static/uploads', filename);

        await fs.writeFile(uploadPath, buffer);

        fotoPath = `/uploads/${filename}`;
    }

    await db.insert(users).values({
        nama,
        email,
        alamat: alamat || '',
        foto: fotoPath
    });
},
    update: async ({ request, platform }) => {

    if (!platform) return;

    const db = createDb(platform.env);

    const form = await request.formData();

    const id = Number(form.get('id'));

    const nama = form.get('nama')?.toString();
    const email = form.get('email')?.toString();
    const alamat = form.get('alamat')?.toString();

    const file = form.get('foto');

    let fotoPath = '';

    if (file && file.size > 0) {

        const buffer =
            Buffer.from(await file.arrayBuffer());

        const filename =
            `${uuidv4()}-${file.name}`;

        const uploadPath =
            path.join('static/uploads', filename);

        await fs.writeFile(uploadPath, buffer);

        fotoPath = `/uploads/${filename}`;
    }

    await db
        .update(users)
        .set({
            nama,
            email,
            alamat: alamat || '',
            foto: fotoPath
        })
        .where(eq(users.id, id));
},
 delete: async ({ request, platform}) => {
    if (!platform) return;
    const db = createDb(platform.env);
    const form = await request.formData();
    const id = Number(form.get('id'));
    
    await db.delete(users).where(eq(users.id, id));
 }
};