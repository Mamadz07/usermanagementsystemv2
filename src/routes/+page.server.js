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
            const username = form.get('username');
            const email = form.get('email');
            const alamat = form.get('alamat');
            const foto = form.get('foto');

            if (!username || ! email) {
                throw new Error("Nama dan Email Wajib diisi");
                
            }
        
        await db.insert(users).values({
            username: form.get(username),
            email: form.get(email),
            alamat: form.get(alamat || ''),
            foto: String(foto || '')
        }); 

    } catch (err) {
        console.error("ERROR CREATE:", err);
    }

    
} delete: async ({ request}) => {
    const form = await request.formData();
    const id = Number (form.get('id'));

    await db.delete(users).where(eq(users.id, id));
 }

}