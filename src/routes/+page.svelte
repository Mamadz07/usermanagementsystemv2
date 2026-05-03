<script>

  const {data} = $props();

  let editMode = $state(false);
  let selectedId = $state(null);

  let nama = $state('');
  let email = $state('');
  let alamat = $state('');
  let foto = $state('');
  let showModal = $state(false);

  function handleEdit(user) {
    console.log("EDIT CLICK:", user);
    editMode = true;
    
    showModal =true;
    nama = user.nama;
    email = user.email;
    alamat = user.alamat;
    foto = user.foto;
  }
</script>

<form method="POST" action={"?/create"}>
    <h3>{"Create User"}</h3>

    <label>Nama</label>
    <input name="nama" bind:value={nama} placeholder="Username" required >

    <label>Email</label>   
    <input name="email" bind:value={email} type="email" placeholder="Email" required>

    <label>Alamat</label>
    <input name="alamat" bind:value={alamat} placeholder="Alamat"/>

    <label>Masukan Foto profil</label>
    <input name="foto" bind:value={foto} placeholder="foto profil" />

    

    <button type="submit">
        {"Create"}    
    </button>
</form>




{#each data.users as user }
    <div style="border:1px solid #ccc; margin: 10px; padding: 10px;">
        <img src={user.foto} width="80" alt="foto"/>
        <p>{user.nama}</p>
        <p>{user.email}</p>
        <p>{user.alamat}</p>

        <button
            type="button"
            on:click={() => handleEdit(user)}
            class="bg-yellow-400 px-3 py-1 rounded">
            Edit
        </button>
        
        <form method="POST" action="?/delete">
            <input type="hidden" name="id" value={user.id} />
            <button type="submit">Hapus</button>
        </form>
    </div>
{/each}

{#if showModal}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-2xl shadow w-[350px] relative">

            <h2 class="text-lg font-bold mb-4">Edit User</h2>
            <form method="POST" action="?/update" class="space-y-3">
                <input type="hidden" name="id" value="{selectedId}"/>

                <input
                    class="w-full border p-2 rounded"
                    name="nama"
                    bind:value={nama}
                    required
                    />
                <input
                    class="w-full border p-2 rounded"
                    name="email"
                    bind:value={email}
                    required 
                    />
                <input
                    class="w-full border p-2 rounded"
                    name="alamat"
                    bind:value={alamat}
                    />
                <input
                    class="w-full border p-2 rounded"
                    name="foto"
                    bind:value={foto}
                    />
                <div class="flex gap-2 mt-4">
                    <button class="bg-blue-500 text-white px-4 py-4 py-2 rounded w-full">
                        Update
                    </button>

                    <button
                        type="button"
                        on:click={() => showModal =false}
                        class="bg-gray-400 text-white px-4 py-2 rounded"
                        > Cancel
                    </button>
                </div>
            </form>
        </div>
    
    </div>    
{/if}
