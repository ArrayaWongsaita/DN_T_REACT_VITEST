import { useEffect, useState } from "react";

type Post = { id: number; title: string };

// ดึงโพสต์จาก /api/posts เมื่อ component ขึ้นหน้า แล้วแสดงเป็นรายการ
export function PostList() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  if (posts === null) return <p>กำลังโหลด...</p>;
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
