import { useEffect, useState } from 'react';
import BlogCard from '../components/PostCard';
import './App.css';

type author = {username: string};
interface Post {
  id: number;
  title: string;
  content: string;
  author: author;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://backend-uoiu.onrender.com/api/posts');
        if (!res.ok) throw new Error('Error fetching data');

        const data = await res.json();
        setPosts(data);
      } catch (e) {
        setErr(`${e}`);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (err) return <div>{err}</div>;

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div
        className="main posts"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '750px',
          width: '100%',
          padding: '8px',
        }}
      >
        <h2>Posts</h2>
        {(posts.length > 0) ? (
          posts.map((post) => <BlogCard {...post} key={post.id} />)
        ) : (
          <div>No posts...</div>
        )}{' '}
      </div>
    </div>
  );
}

export default App;
