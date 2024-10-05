import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from '../misc/formatData';
import { useAuth } from '../hooks/AuthProvider';

interface Comment {
  id: number;
  user: { username: string };
  content: string;
  createdAt: string;
  postId: number;
  userId: number;
}

interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  comments: Comment[];
}

const CardDetails: React.FC = () => {
  const { id } = useParams();
  const auth = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://backend-uoiu.onrender.com/api/posts/${id}`
        );
        if (!res.ok) throw new Error('Error fetching data');

        const data = await res.json();
        setPost(data);
      } catch (e) {
        setErr(`${e}`);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, comment]);

  const handleComment = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      content: { value: string };
    };

    const comment = target.content.value;
    try {
      await fetch(
        `https://backend-uoiu.onrender.com/api/posts/${id}/comments`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: comment }),
        }
      );

      target.content.value = '';
      setComment(comment);
    } catch (e) {
      console.error(e);
    }
  };

  const commentCards = () => {
    return post?.comments.map((comment, index) => (
      <div
        key={index}
        className="commentCard"
        style={{
          backgroundColor: 'white',
          border: '1px solid gray',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span>{comment.content}</span>
        <span className="signature">
          -by <strong>{comment.user.username || 'anonymous'}</strong> on{' '}
          {formatDate(comment.createdAt)}
        </span>
      </div>
    ));
  };

  if (loading) return <div>Loading...</div>;
  if (err) return <div>{err}</div>;

  return (
    <div>
      {!post ? (
        <div>Post Does Not Exist...</div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: '700px',
            }}
          >
            <h2>Post Details</h2>
            <h3
              style={{
                backgroundColor: '#4ade80',
                color: '#fff',
                marginBottom: '8px',
                marginTop: '0px',
                width: '100%',
              }}
            >
              {post.title}
            </h3>
            <p>{post.content}</p>
            <p className="signature">
              -by{' '}
              <strong>{post.comments[0]?.user.username || 'anonymous'}</strong>{' '}
              on {formatDate(post.createdAt)}
            </p>
            <div className="comments" style={{ width: '100%' }}>
              <h3
                style={{
                  backgroundColor: '#4ade80',
                  color: '#fff',
                  marginBottom: '8px',
                  marginTop: '0px',
                  width: '100%',
                }}
              >
                Comments:
              </h3>
              {post.comments.length > 0 ? (
                commentCards()
              ) : (
                <p>No comments...</p>
              )}
            </div>

            <form
              className="commentForm"
              onSubmit={handleComment}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="content">Comment:</label>
                <textarea
                  name="content"
                  required
                  maxLength={150}
                  minLength={3}
                  style={{
                    resize: 'vertical',
                    padding: '8px',
                    height: '107px',
                  }}
                  title={
                    !auth.isAuthenticated ? 'Authenticate to post comments' : ''
                  }
                  disabled={!auth.isAuthenticated}
                />
              </div>
              <button
                type="submit"
                disabled={!auth.isAuthenticated}
                style={{ width: 'fit-content' }}
              >
                {auth.isAuthenticated ? 'Submit' : 'Log in to comment'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetails;
