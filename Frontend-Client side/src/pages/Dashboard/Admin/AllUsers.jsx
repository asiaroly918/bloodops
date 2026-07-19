import { useEffect, useState } from "react";
import axiosSecure from "../../../utils/axiosSecure";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  const loadUsers = () => {
    axiosSecure
      .get("/admin/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // USER ACTION
  const handleAction = (id, action) => {
    axiosSecure
      .patch(`/admin/users/${id}/${action}`)
      .then((res) => {
        console.log(res.data);
        loadUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // FILTER
  const filteredUsers = users.filter((user) => {
    if (filter === "all") {
      return true;
    }
    return user.status === filter;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>

      {/* Filter */}
      <div className="mb-5">
        <select
          className="select select-bordered text-black"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="table w-full text-black">
          <thead>
            <tr className="text-black">
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={user.avatar} alt={user.name} />
                    </div>
                  </div>
                </td>

                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td>
                  {user.status === "active" ? (
                    <span className="badge badge-success">Active</span>
                  ) : (
                    <span className="badge badge-error">Blocked</span>
                  )}
                </td>

                <td>
                  <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="btn btn-sm">
                      ⋮
                    </button>

                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-gray-800 rounded-box w-56 z-[9999]"
                    >
                      {user.status === "active" && (
                        <li>
                          <button
                            className="text-white hover:bg-gray-700 rounded-md"
                            onClick={() => handleAction(user._id, "block")}
                          >
                            Block
                          </button>
                        </li>
                      )}

                      {user.status === "blocked" && (
                        <li>
                          <button
                            className="text-white hover:bg-gray-700 rounded-md"
                            onClick={() => handleAction(user._id, "unblock")}
                          >
                            Unblock
                          </button>
                        </li>
                      )}

                      {user.role === "donor" && (
                        <li>
                          <button
                            className="text-white hover:bg-gray-700 rounded-md"
                            onClick={() => handleAction(user._id, "make-volunteer")}
                          >
                            Make Volunteer
                          </button>
                        </li>
                      )}

                      {(user.role === "donor" || user.role === "volunteer") && (
                        <li>
                          <button
                            className="text-white hover:bg-gray-700 rounded-md"
                            onClick={() => handleAction(user._id, "make-admin")}
                          >
                            Make Admin
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;