describe("deletion of a note", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await helper.notesInDb();
    assert.strictEqual(notesAtEnd.length, notesAtStart.length - 1);

    const contents = notesAtEnd.map((r) => r.content);
    assert(!contents.includes(noteToDelete.content));
  });

  test("fails with statuscode 404 if note does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();
    await api.delete(`/api/notes/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "notavalidid123";
    await api.delete(`/api/notes/${invalidId}`).expect(400);
  });
});
