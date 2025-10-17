import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser, fetchUsers } from "../services/usersService";
import { startEditing } from "../reducers/userFormSlice";

const Users = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  if (isLoading) return <p>⏳ Loading users...</p>;
  if (error) return <p>❌ Error: {error.message}</p>;

  return (
    <div>
      <button onClick={() => refetch()}>🔄 Refresh</button>

      <ul style={{ marginTop: "1rem" }}>
        {data.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => dispatch(startEditing(user))}
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => deleteMutation.mutate(user.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
