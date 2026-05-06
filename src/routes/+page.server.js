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
            const foto = form.get('foto')?.toString();

            if (!nama || ! email) {
                throw new Error("Nama dan Email Wajib diisi");
                
            }
       
        await db.insert(users).values({
            nama,
            email,
            alamat: alamat || '',
            foto: foto || ''
        }); 
        
        }, 
    update: async ({ request, platform}) => {
        if (!platform) return;
        const db = createDb(platform.env);
        const form = await request.formData();

        const id = Number(form.get('id'));
        await db
            .update(users)
            .set({
        nama: form.get("nama")?.toString(),
        email: form.get("email")?.toString(),
        alamat: form.get("alamat")?.toString(),
        foto : form.get("foto")?.toString(),
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