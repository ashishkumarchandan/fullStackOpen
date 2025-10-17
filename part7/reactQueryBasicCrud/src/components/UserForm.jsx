import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../services/usersService";
import { resetForm, setEmail, setName } from "../reducers/userFormSlice";

const UserForm = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { name, email, editingUserId } = useSelector((state) => state.userForm);

  const mutation = useMutation({
    mutationFn: editingUserId ? updateUser : addUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      dispatch(resetForm());
      alert(editingUserId ? "✅ User updated!" : "✅ User added!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return alert("Please fill all fields");

    if (editingUserId) {
      mutation.mutate({ id: editingUserId, name, email });
    } else {
      mutation.mutate({ name, email });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <h3>{editingUserId ? "✏️ Edit User" : "➕ Add User"}</h3>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
          style={{ marginRight: "8px" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
          style={{ marginRight: "8px" }}
        />

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : editingUserId ? "Update" : "Add"}
        </button>

        {editingUserId && (
          <button
            type="button"
            onClick={() => dispatch(resetForm())}
            style={{ marginLeft: "8px" }}
          >
            ❌ Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default UserForm;
