import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import BlogForm from "./BlogForm";

test("<BlogForm /> calls createBlog with correct details (5.16)", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByRole("textbox", { name: /title:/i });
  const authorInput = screen.getByRole("textbox", { name: /author:/i });
  const urlInput = screen.getByRole("textbox", { name: /url:/i });
  const createButton = screen.getByText("create");

  await user.type(titleInput, "Component testing with RTL");
  await user.type(authorInput, "Ashish");
  await user.type(urlInput, "http://testing.com");
  await user.click(createButton);

  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "Component testing with RTL",
    author: "Ashish",
    url: "http://testing.com",
  });
});
