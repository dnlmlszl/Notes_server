import { Link } from 'react-router-dom';

const UserInfo = ({ id, name, username }) => {
  return (
    <article className="space-y-2 text-gray-600 flex flex-col justify-between">
      <p className="text-lg font-semibold">{name}</p>
      <p className="text-sm text-gray-600">{username}</p>
      <Link
        to={`/users/${id}`}
        className="px-2 py-1 border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white rounded transition duration-150 ease-in-out"
      >
        Details...
      </Link>
    </article>
  );
};

export default UserInfo;
