import Link from "next/link";
import { getPosts } from "../../lib/wordpress";

export default async function NewsPage() {
  const posts = await getPosts();

  return (
    <main style={{ maxWidth: "900px", margin: "60px auto", padding: "20px" }}>
      <h1>News</h1>

      {posts.map((post) => (
        <article
          key={post.id}
          style={{
            borderBottom: "1px solid #ddd",
            marginBottom: "30px",
            paddingBottom: "20px",
          }}
        >
          <h2>{post.title.rendered}</h2>

          <div
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          />

          <Link href={`/news/${post.slug}`}>
            Read More →
          </Link>
        </article>
      ))}
    </main>
  );
}
