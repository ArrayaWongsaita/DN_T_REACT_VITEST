import { useEffect, useState } from "react";

type Post = { id: number; title: string };

// เหมือนบทที่ 12 แต่รองรับกรณีโหลดพังและกรณีไม่มีโพสต์
export function SafePostList() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then(setPosts)
      .catch(() => setFailed(true));
  }, []);

  if (failed) return <p role="alert">โหลดไม่สำเร็จ</p>;
  if (posts === null) return <p>กำลังโหลด...</p>;
  if (posts.length === 0) return <p>ยังไม่มีโพสต์</p>;
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
