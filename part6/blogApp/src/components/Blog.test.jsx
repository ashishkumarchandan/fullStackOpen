import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Blog from "./Blog";

describe("<Blog />", () => {
  let blog;
  let user;
  let updateLikeMock;
  let removeBlogMock;
  let loggedInUser;

  beforeEach(() => {
    blog = {
      id: "123",
      title: "Testing React Components",
      author: "Ashish",
      url: "http://example.com",
      likes: 10,
      user: {
        username: "ashish",
        name: "Ashish Chandan",
      },
    };

    loggedInUser = { username: "ashish", name: "Ashish Chandan" };

    updateLikeMock = vi.fn();
    removeBlogMock = vi.fn();

    render(
      <Blog
        blog={blog}
        updateLike={updateLikeMock}
        removeBlog={removeBlogMock}
        user={loggedInUser}
      />
    );
  });

  test("renders title and author but not url or likes by default (5.13)", () => {
    expect(screen.getByText("Testing React Components Ashish")).toBeDefined();
    expect(screen.queryByText("http://example.com")).toBeNull();
    expect(screen.queryByText("likes 10")).toBeNull();
  });

  test("shows url and likes when view button is clicked (5.14)", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    expect(screen.getByText("http://example.com")).toBeDefined();
    expect(screen.getByText("likes 10")).toBeDefined();
  });

  test("clicking like button twice calls event handler twice (5.15)", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(updateLikeMock).toHaveBeenCalledTimes(2);
  });
});
