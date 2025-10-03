import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'
import { vi } from 'vitest'

describe('Note component', () => {
  const note = { content: 'Testing Note Component', important: true }

  test('renders content', () => {
    render(<Note note={note} toggleImportance={() => {}} deleteNote={() => {}} />)
    expect(screen.getByText('Testing Note Component')).toBeDefined()
  })

  test('clicking importance button calls handler', async () => {
    const mockHandler = vi.fn()
    render(<Note note={note} toggleImportance={mockHandler} deleteNote={() => {}} />)

    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: 'make not important' })
    await user.click(button)

    expect(mockHandler).toHaveBeenCalledTimes(1)
  })

  test('delete button calls delete handler', async () => {
    const mockDelete = vi.fn()
    render(<Note note={note} toggleImportance={() => {}} deleteNote={mockDelete} />)

    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: 'delete' })
    await user.click(button)

    expect(mockDelete).toHaveBeenCalledTimes(1)
  })
})



// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import Note from './Note'

// test('clicking the button calls event handler once', async () => {
//   const note = { content: 'Testing interactions', important: true }

//   const mockHandler = vi.fn() // Vitest ka mock function

//   render(<Note note={note} toggleImportance={mockHandler} deleteNote={() => {}} />)

//   const user = userEvent.setup()
//   const button = screen.getByRole('button', { name: 'make not important' })
//   await user.click(button)

//   expect(mockHandler).toHaveBeenCalledTimes(1)
// })



// import { render, screen } from '@testing-library/react'
// import { logRoles, prettyDOM } from '@testing-library/dom'
// import Note from './Note'

// test('debug example', () => {
//   const note = { content: 'Debugging test example', important: false }

//   const { container } = render(<Note note={note} toggleImportance={() => {}} deleteNote={() => {}} />)

//   // Print entire DOM
//   screen.debug()

//   // Print all roles
//   logRoles(container)

//   // Print only delete button
//   const button = screen.getByRole('button', { name: 'delete' })
//   console.log(prettyDOM(button))

//   expect(button).toBeDefined()
// })



// import { render, screen } from '@testing-library/react'
// import Note from './Note'

// test('renders content and button', () => {
//   const note = {
//     content: 'Learning Testing Library is fun!',
//     important: false,
//   }

//   render(<Note note={note} toggleImportance={() => {}} deleteNote={() => {}} />)

//   // getByText - strict, fail if not found
//   const contentElement = screen.getByText('Learning Testing Library is fun!')
//   expect(contentElement).toBeDefined()

//   // getByRole - better than getByText for buttons
//   const button = screen.getByRole('button', { name: 'delete' })
//   expect(button).toBeDefined()

//   // queryByText - should not find this
//   const wrongElement = screen.queryByText('this text should not exist')
//   expect(wrongElement).toBeNull()
// })
