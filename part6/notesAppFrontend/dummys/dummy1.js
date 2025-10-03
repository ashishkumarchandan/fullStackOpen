import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NoteForm from "./NoteForm";

test("NoteForm calls createNote with right details", async () => {
  const createNote = vi.fn();

  render(<NoteForm createNote={createNote} />);

  const user = userEvent.setup();
  const input = screen.getByPlaceholderText("write note content");
  const saveButton = screen.getByText("save");

  await user.type(input, "testing a form...");
  await user.click(saveButton);

  expect(createNote).toHaveBeenCalledTimes(1);
  expect(createNote).toHaveBeenCalledWith({
    content: "testing a form...",
    important: false,
  });
});
