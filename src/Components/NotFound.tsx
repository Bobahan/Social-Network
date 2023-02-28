import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div>
      <h1>404 Page is not found</h1>
      <Link to={'/profile'}>
        <button>Go back</button>
      </Link>
    </div>
  );
};
