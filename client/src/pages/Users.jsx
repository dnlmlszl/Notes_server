import { useEffect, useState } from 'react';
import userService from '../services/users';

import UserInfo from '../components/UserInfo';
import Loading from '../components/Loading';

const Users = () => {
  const [dashboardUsers, setDashboardUSers] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await userService.getUsers();

        setDashboardUSers(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setLoading]);

  if (loading) return <Loading />;

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 md:mt-10 mx-4 md:mx-10 p-5 border rounded-md shadow-lg bg-white">
      <h2 className=" col-span-2 md:col-span-4 text-2xl font-bold mb-4 border-b pb-2 text-[#34495e]">
        Users info
      </h2>
      {dashboardUsers &&
        dashboardUsers.map((user) => {
          return (
            <ul
              key={user.id}
              className="p-4 border rounded-md shadow-sm bg-gray-50"
            >
              <UserInfo {...user} />
            </ul>
          );
        })}
    </section>
  );
};

export default Users;
