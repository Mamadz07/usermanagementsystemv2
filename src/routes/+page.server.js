import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const load = async () => {
    const data = await db.select().from(users);
    return { users: data };
};

export const actions = {
    create: async ({ request }) => {
        try {
            const form = await request.formData();
            const nama = form.get('nama')?.toString();
            const email = form.get('email')?.toString();
            const alamat = form.get('alamat')?.toString();
            const foto = form.get('foto')?.toString();

            if (!nama || ! email) {
                throw new Error("Nama dan Email Wajib diisi");
                
            }
        
        await db.insert(users).values({
            nama: nama,
            email: email,
            alamat: alamat || '',
            foto: foto || ''
        }); 
        
        } catch (err) {
        console.error("ERROR CREATE:", err);
        }
    },
 update: async ({ request}) => {
    try {
        const form = await request.formData();

        const id = Number(form.get('id'));
        const nama = form.get('nama')?.toString();
        const email = form.get('email')?.toString();
        const alamat = form.get('alamat')?.toString();
        const foto = form.get('foto')?.toString();

        if (!id) throw new Error ("ID tidak ditemukan");

        await db
            .update(users)
            .set({
                nama,
                email,
                alamat : alamat || '',
                foto: foto || ''
            })
            .where(eq(users.id, id));
                console.log("UPDATE BERHASIL");
            
    } catch (err){
        console.error("ERROR UPDATE", err);
    }
 },delete: async ({ request}) => {
    const form = await request.formData();
    const id = Number(form.get('id'));

    await db.delete(users).where(eq(users.id, id));
 }
};