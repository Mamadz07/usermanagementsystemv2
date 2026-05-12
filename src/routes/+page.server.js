import { createDb } from "$lib/server/db/db";
import { users } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

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

    let fotoBase64 = '';

    if (file && file.size > 0) {

        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        fotoBase64 =
            `data:${file.type};base64,${buffer.toString('base64')}`;
    }

    await db.insert(users).values({
        nama,
        email,
        alamat: alamat || '',
        foto: fotoBase64
    });
}, update: async ({ request, platform }) => {

    if (!platform) return;

    const db = createDb(platform.env);

    const form = await request.formData();

    const id = Number(form.get('id'));

    const nama = form.get('nama')?.toString();
    const email = form.get('email')?.toString();
    const alamat = form.get('alamat')?.toString();

    const file = form.get('foto');

    let fotoBase64 = '';

    if (file && file.size > 0) {

        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        fotoBase64 =
            `data:${file.type};base64,${buffer.toString('base64')}`;
    }

    await db
        .update(users)
        .set({
            nama,
            email,
            alamat: alamat || '',
            foto: fotoBase64
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