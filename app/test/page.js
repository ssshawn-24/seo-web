import { getPosts } from "../../lib/wordpress";

export default async function TestPage() {
  const posts = await getPosts();

  return (
    <main style={{ padding: "40px" }}>
      <h1>WordPress API Test</h1>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            marginBottom: 30,
            paddingBottom: 20,
            borderBottom: "1px solid #ddd",
          }}
        >
          <h2>{post.title.rendered}</h2>

          <div
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          />
        </div>
      ))}
    </main>
  );
}