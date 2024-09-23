export async function GET({ url }) {
  const id = url.searchParams.get('id');
  const fetchUrl = url.searchParams.get('fetchUrl');

  console.log(typeof fetchUrl, fetchUrl);

  let imageUrl;

  if (!id) {
    if (!fetchUrl) {
      return new Response('id or fetchUrl is required', { status: 400 });
    } else {
      imageUrl = fetchUrl;
      console.log(`imageUrl is ${fetchUrl}`)
    }
  } else {
    imageUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    // const imageUrl = `https://img.youtube.com/vi/pgtF0Zdcpbo/hqdefault.jpg`;
    console.log(`imageUrl is ${imageUrl}`)
  }
  const response = await fetch(imageUrl);

  if (!response.ok) {
    return new Response('Failed to fetch image', { status: 500 });
  }

  const imageBuffer = await response.arrayBuffer();
  return new Response(imageBuffer, {
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
    }
  });
}

