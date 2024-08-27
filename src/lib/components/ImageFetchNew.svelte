<script>
  let image = null;
  $: image;

  const preload = async (src) => {
    const resp = await fetch(src);
    const blob = await resp.blob();

    return new Promise(function (resolve) {
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject('Error: ', error);
    });
  };
</script>

{#await preload("https://picsum.photos/200/300")}
  Image is loading!
{:then base64}
  <img src="{base64}" alt="Alright Buddy!" />
  	<code>{base64}</code>
{/await}