<script>

    import { flip } from 'svelte/animate';
    import { fade, fly, scale } from 'svelte/transition';

  const {data} = $props();

  let editMode = $state(false);
  let selectedId = $state(null);

  let nama = $state('');
  let email = $state('');
  let alamat = $state('');
  let foto = $state('');
  let showModal = $state(false);
  let previewImage = $state('');
  let showImageModal = $state(false);

  function handleEdit(user) {
    console.log("EDIT CLICK:", user);
    editMode = true;
    selectedId = user.id;
    showModal =true;
    nama = user.nama;
    email = user.email;
    alamat = user.alamat;
    foto = user.foto;
  }
  function openImage(image) {
    previewImage = image;
    showImageModal = true;
}
</script>
<div class="min-h-screen bg-gray-100 p-6">
    <div class="grid md:grid-cols-2 gap-6">

        <!-- ini untuk form -->
    <div class="bg-white p-6 rounded-2xl shadow">
        <h2 class="text-xl font-bold mb-4">
            Create User
        </h2>
    <form method="POST" action="?/create" enctype="multipart/form-data" class="space-y-3">
    
        <input
            class="w-full border p-2 rounded"
            name="nama"
            bind:value={nama}
            placeholder="Nama"
            required
            />

        <input
            class="w-full border p-2 rounded"
            name="email"
            bind:value={email}
            placeholder="Email"
            required
            />

        <input
            class="w-full border p-2 rounded"
            name="alamat"
            bind:value={alamat}
            placeholder="Alamat"
            />
    
        <input
            class="w-full border p-2 rounded"
            type="file"
            name="foto"
            accept="image/*"
            />
        <div class="flex gap-2">
            <button class="bg-blue-500 text-white px-4 py-2 rounded w-full">
                create
            </button>
  
        </div>
        </form>

    </div>
    

    <!-- ini untuk list user -->
<div class="grid gap-4">
    {#each data.users as user }
        <div class="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
        <img
    src={user.foto || "https://via.placeholder.com/80"}
    class="w-16 h-16 rounded-full object-cover cursor-pointer hover:scale-110 transition"
    alt="foto"
    onclick={() => openImage(user.foto)}
/>
        <div class="flex-1">
            <p class="font-bold">{user.nama}</p>
            <p class="text-sm text-gray-500">{user.email}</p>
            <p class="text-sm">{user.alamat}</p>
        </div>

        <div class="flex flex-col gap-2">
        <button
            type="button"
            onclick={() => handleEdit(user)}
            class="bg-yellow-400 px-3 py-1 rounded">
            Edit
        </button>

        <form method="POST" action="?/delete">
            <input type="hidden" name="id" value={user.id} />
            <button type="submit">Hapus</button>
        </form>
        </div>
    </div>

 {/each}
 </div>
</div>
</div>


{#if showModal}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onclick={() => showModal = false}>
        <div class="bg-white p-6 rounded-2xl shadow w-[350px] relative"
            onclick={(e) => e.stopPropagation()}>

            <h2 class="text-lg font-bold mb-4">Edit User</h2>
            <form
    method="POST"
    action="?/update"
    enctype="multipart/form-data"
    class="space-y-3">
                <input type="hidden" name="id" value={selectedId}/>

                <input
                    class="w-full border p-2 rounded"
                    name="nama"
                    bind:value={nama}
                    placeholder="Nama"
                    required
                    />
                <input
                    class="w-full border p-2 rounded"
                    name="email"
                    bind:value={email}
                    placeholder="Email"
                    required 
                    />
                <input
                    class="w-full border p-2 rounded"
                    name="alamat"
                    bind:value={alamat}
                    placeholder="Alamat"
                    />
                <input
    class="w-full border p-2 rounded"
    type="file"
    name="foto"
    accept="image/*"
/>
                <div class="flex gap-2 mt-4">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded w-full">
                        Update
                    </button>

                    <button
                        type="button"
                        onclick={() => showModal =false}
                        class="bg-gray-400 text-white px-4 py-2 rounded"
                        > Cancel
                    </button>
                </div>
            </form>
        </div>
    
    </div>    
{/if}

{#if showImageModal}
<div
    class="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]"
    in:fade
    out:fade
    onclick={() => showImageModal = false}
>

    <div
        class="relative"
        in:scale={{ start: 0.8, duration: 200 }}
        out:scale={{ duration: 150 }}
        onclick={(e) => e.stopPropagation()}
    >

        <img
            src={previewImage}
            alt="preview"
            class="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl"
        />

        <button
            class="absolute -top-3 -right-3 bg-white w-10 h-10 rounded-full shadow text-xl"
            onclick={() => showImageModal = false}
        >
            ×
        </button>

    </div>
</div>
{/if}