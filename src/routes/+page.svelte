<script>
  const {data} = $props();
</script>

<form method="POST" action="?/create" style=" margin-top: 20px; background-color: aqua; padding: 20px; ">
    <h3 style="text-align:center;">Create User</h3>

    <label>Nama</label>
    <input name="nama" placeholder="Username" required >

    <label>Email</label>   
    <input name="email" type="email" placeholder="Email" required>

    <label>Alamat</label>
    <input name="alamat" placeholder="Alamat"/>

    <label>Masukan Foto profil</label>
    <input name="foto" placeholder="foto profil" />

    <button type="submit">Create</button>
</form>




{#each data.users as user }
    <div style="border:1px solid #ccc; margin: 10px; padding: 10px;">
        <img src={user.foto} width="80"/>
        <p>{user.nama}</p>
        <p>{user.email}</p>
        <p>{user.alamat}</p>

        <form method="POST" action="?/delete">
            <input type="hidden" name="id" value={user.id} />
            <button type="submit">Hapus</button>
        </form>
    </div>
{/each}
