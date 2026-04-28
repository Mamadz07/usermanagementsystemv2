<script>
  import { on } from "events";

  const {data} = $props();

  let editMode = false;
  let selectedId = null;

  let nama = '';
  let email = '';
  let alamat = '';
  let foto = '';

  function handleEdit(user) {
    editMode = true;
    selectedId = user.id;

    nama = user.nama;
    email = user.email;
    alamat = user.alamat;
    foto = user.foto;
  }
</script>

<form method="POST" action={editMode ? "?/update" : "?/create"}>
    <h3>{editMode ? "Edit User" ? "Create User"}</h3>

    <label>Nama</label>
    <input name="nama" bind:value={nama} placeholder="Username" required >

    <label>Email</label>   
    <input name="email" bind:value={email} type="email" placeholder="Email" required>

    <label>Alamat</label>
    <input name="alamat" bind:value={alamat} placeholder="Alamat"/>

    <label>Masukan Foto profil</label>
    <input name="foto" bind:value={foto} placeholder="foto profil" />

    {#if editMode}
        <input type="hidden" name ="id" value={selectedId}/>
    {/if}

    <button type="submit">
        {editMode ? "Update" : "Create"}    
    </button>
</form>




{#each data.users as user }
    <div style="border:1px solid #ccc; margin: 10px; padding: 10px;">
        <img src={user.foto} width="80" alt="foto"/>
        <p>{user.nama}</p>
        <p>{user.email}</p>
        <p>{user.alamat}</p>

        <button on:click={() => handleEdit(user)}>
            Edit
        </button>
        
        <form method="POST" action="?/delete">
            <input type="hidden" name="id" value={user.id} />
            <button type="submit">Hapus</button>
        </form>
    </div>
{/each}
