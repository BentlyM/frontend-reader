import { useEffect, useState } from 'react';
import BlogCard from '../components/PostCard';
import './App.css';

interface Post {
  id: number;
  title: string;
  content: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://backend-uoiu.onrender.com/api/posts');
        if (!res.ok) throw new Error('Error fetching data');

        const data = await res.json();
        setPosts(data);
      } catch (e) {
        setErr(`something went wrong: ${e}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (err) return <div>Error: {err}</div>;

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
