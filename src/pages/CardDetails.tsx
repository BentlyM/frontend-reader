import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from '../misc/formatData';
import { useAuth } from '../hooks/AuthProvider';

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  postId: number;
  userId: number;
  post: Post
  user: {
    username: string;
  };
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
  msg: string
}


const CardDetails = () => {
  const { id } = useParams();
  const auth = useAuth();

  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://backend-uoiu.onrender.com/api/posts/${id}/comments`
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
        `https://backend-uoiu.onrender.com/api/posts/${post?.id}/comments`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: comment,
          }),
        }
      ); 

      target.content.value = '';
      
      setComment(comment);
    } catch (e) {
      console.error(e);
    }
  };

  function commentCards() {
    return post!.comments.map((comment, index) => (
      <div
        key={index}
        className="commentCard"
        style={{
          backgroundColor: 'white',
          border: '1px solid gray',
          borderImage: 'liner-gradient(to right, #b4b4b4 20%, #fff) 1',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span>{comment.content}</span>
        <span className="signature">
          -by <strong>{comment.user?.username || 'anonymous'}</strong> on {formatDate(comment.createdAt)}
        </span>
      </div>
    ));
  }

  if (loading) return <div>Loading...</div>;
  if (err) return <div>{err}</div>;

  return (
    <>
      {post?.msg != 'Comments Found' ? (
        <div>Post Does Not Exist...</div>
      ) : (
        <div>
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
                justifyContent: 'center',
                alignItems: 'start',
                flexDirection: 'column',
                minWidth: '700px',
              }}
            >
              <h2>Post Details</h2>
              <>
                <h3
                  style={{
                    backgroundColor: '#4ade80',
                    boxShadow: '2px 10px 0 -7px green',
                    color: '#fff',
                    marginBottom: '8px',
                    marginTop: '0px',
                    width: '100%',
                  }}
                >
                  {post?.comments[0].post.title}
                </h3>
                <p>{post?.comments[0].post.content}</p>
                <p className="signature">
                  -by <strong>{post?.comments[0].user.username || 'anonymous'}</strong> on {formatDate(post!.comments[0].post.createdAt)}
                </p>
                <div className="comments" style={{ width: '100%' }}>
                  <h3
                    style={{
                      backgroundColor: '#4ade80',
                      boxShadow: '2px 10px 0 -7px green',
                      color: '#fff',
                      marginBottom: '8px',
                      marginTop: '0px',
                      width: '100%',
                    }}
                  >
                    Comments:{' '}
                  </h3>
                  {post!.comments.length > 0 ? (
                    commentCards()
                  ) : (
                    <p>No comments...</p>
                  )}
                </div>

                <form
                  className="commentForm"
                  action=""
                  onSubmit={handleComment}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      maxWidth: 'none',
                      width: 'auto',
                      flexDirection: 'column',
                    }}
                  >
                    <label htmlFor="content">Comment: </label>
                    <textarea
                      name="content"
                      required
                      maxLength={150}
                      minLength={3}
                      style={{
                        resize: 'vertical',
                        fontSize: 'inherit',
                        padding: '8px',
                        height: '107px',
                      }}
                      title={
                        auth.isAuthenticated
                          ? ''
                          : 'Authenticate to post comments'
                      }
                      disabled={auth.isAuthenticated ? false : true}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={auth.isAuthenticated ? false : true}
                    style={{ width: 'fit-content' }}
                  >
                    {auth.isAuthenticated ? 'Submit' : 'Log in to comment'}
                  </button>
                </form>
                <div className="errors"></div>
              </>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardDetails;
