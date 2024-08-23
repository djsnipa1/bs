<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { videoId } from '$lib/stores/store.js';

  import { extractColors } from 'extract-colors';

  let imageUrl;
  let newColors = 'stuff';
  let colorsError = 'error';

  /*
  async function fetchAndEncodeImage(imageUrl) {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error fetching or encoding image:', error);
      throw error;
    }
  }

  import { getDominantColors, rgbToHex } from 'color-supreme';
  import { getImageFromUrl } from 'pixel-paradise';

  let color1, color2, gradientWrap;
  let imageUrl = '';
*/
  onMount(async () => {
    $: console.log(`colors: ${newColors}`);

    imageUrl = `https://img.youtube.com/vi/${$videoId}/hqdefault.jpg`;

    const options = {
      crossOrigin: 'anonymous'
    };

    const response = await fetch(imageUrl);
    const blob = await response.blob();
    imageUrl = URL.createObjectURL(blob);

    extractColors(imageUrl, { crossOrigin: 'anonymous' })
      .then((colors) => {
        //setColorslist(colors);
        newColors = colors;
        console.log(colors);
      })
      .catch(console.error);

    /*   
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    imageUrl = URL.createObjectURL(blob);
*/

    // Try conditional import of grade-js
    // const { default: Grade } = await import('grade-js');
    /*   
    Grade(
            document.querySelectorAll('.gradient-wrap'),
            null,
            function (gradientData) {
     */
    // This section is so I could download the gradientData JSON to text file
    /*        function download(content, fileName, contentType) {
                var a = document.createElement('a');
                var file = new Blob([content], { type: contentType });
                a.href = URL.createObjectURL(file);
                a.download = fileName;
                a.click();
              }
              download(JSON.stringify(gradientData), 'json.txt', 'text/plain');
    */
    /*
              [color1, color2] = gradientData[0].gradientData.map((item) => {
                const [r, g, b, a] = item.rgba;
                return { r, g, b, a };
              });

              console.log(color1);
  
            },
          );

   */
  });
</script>

<div class="flex h-1/2 w-full items-center justify-center pt-20">
  <img src={imageUrl} class="aspect-video size-20" alt="Fetched Image" />

  <h1>{newColors}</h1>
  <h1>{colorsError}</h1>
</div>
<!--
<div class="size-20" style="background-image: url({imageUrl});">
  
</div>
-->
