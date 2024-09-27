import BlogCard from '../components/PostCard';
import './App.css';

function App() {
  const mockPosts = [
    {
      id: 1,
      title: 'something',
      content: 'something to post inside my blog lol',
    },
    {
      id: 2,
      title: 'something different',
      content: 'something different about the world i do not know of yet',
    },
    {
      id: 3,

      title: 'another post',

      content: 'this is another post about my daily life',
    },

    {
      id: 4,

      title: 'a new post',

      content: 'this is a new post about my new hobby',
    },

    {
      id: 5,

      title: 'a funny post',

      content: 'this is a funny post about my funny experience',
    },
    
  ];
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
        {mockPosts && mockPosts.map((post) => <BlogCard {...post} key={post.id}/>)}
      </div>
    </div>
  );
}

export default App;
