import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { create } from "node:domain";
import { request } from "node:http";

export const load = async () => {
    const data = await db.select().from(users);
    return { users: data };
};

export const actions = {
    create: async ({ request }) => {
        const form = await request.formData();
        const nama = form.get('nama');
        const email = form.get('email');
        const alamat = form.get('alamat');
        const foto = from.get('foto');

        await db.insert(users).values({
            nama,
            email,
            alamat,
            foto
        });

    },


 delete: async ({ request}) => {
    const form = await request.formData();
    const id = form.get('id');

    await db.delete(users).where(users.id.eq(Number(id)));
 }

}