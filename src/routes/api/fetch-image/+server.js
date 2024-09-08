export async function GET({ url }) {
  const id = url.searchParams.get('id');
  if (!id) {
    return new Response('ID is required', { status: 400 });
  }

  // const imageUrl = `https://img.youtube.com/vi/pgtF0Zdcpbo/hqdefault.jpg`;
  const imageUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
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

