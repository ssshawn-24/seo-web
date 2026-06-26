const API =
  "https://public-api.wordpress.com/wp/v2/sites/shawnwebhost.wordpress.com";

export async function getPosts() {
  const res = await fetch(`${API}/posts`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}