import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const Navbar = () => {
  const auth = useAuth();
  const user = localStorage.getItem('user');
  return (
    <>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: '#4ade80',
          boxShadow: '2px 10px 0 -7px green',
          paddingBottom: '5px',
          width: '100%',
          color: 'white',
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>
            <a style={{ textDecoration: 'none', color: 'white' }} href="/">
              Reader's oasis
            </a>
          </h2>
          <span>
            <a style={{ textDecoration: 'none', color: 'white' }} href="/">
              All Posts
            </a>
          </span>
        </div>

        {auth.isAuthenticated ? (
          <div style={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center', gap: '10px'}}>
            <span>Welcome {user}!</span>
            <button onClick={() => auth.logout()} className="btn-submit" style={{width: 'fit-content', height: 'fit-content'}}>
              logout
            </button>
          </div>
        ) : (
          <div>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '15px' }}>
              <li>
                <Link
                  to={'/login'}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to={'/register'}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
