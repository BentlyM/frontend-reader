import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/NavBar';
import { formatDate } from '../misc/formatData';

interface Comments {
  content: string;
  createdAt: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  comments: Comments[];
  msg?: string;
  createdAt: string;
}

const CardDetails = ({
  isAuthenticated,
}: {
  isAuthenticated: string /* change this a later */;
}) => {
  const { id } = useParams();

  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

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
  }, [id]);

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
          -by <strong>[Author]</strong> on {formatDate(comment.createdAt)}
        </span>
      </div>
    ));
  }

  if (loading) return <div>Loading...</div>;
  if (err) return <div>{err}</div>;

  return (
    <>
      {post?.msg == 'Post Not Found' ? (
        <div>Post Does Not Exist...</div>
      ) : (
        <div>
          <Navbar />
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
                  {post?.title}
                </h3>
                <p>{post?.content}</p>
                <p className="signature">
                  -by <strong>[Author]</strong> on {formatDate(post!.createdAt)}
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
                  onSubmit={undefined}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '100%'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    maxWidth: 'none',
                    width: 'auto',
                    flexDirection: 'column',
                  }}>
                    <label htmlFor="comment">Comment: </label>
                    <textarea
                      name="comment"
                      required
                      maxLength={150}
                      minLength={3}
                      style={{resize: 'vertical', fontSize: 'inherit', padding: '8px', height: '107px'}}
                      title={
                        isAuthenticated ? '' : 'Authenticate to post comments'
                      }
                      disabled={isAuthenticated ? false : true}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isAuthenticated ? false : true}
                    style={{width: 'fit-content'}}
                  >
                    {isAuthenticated ? 'Submit' : 'Log in to comment'}
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
