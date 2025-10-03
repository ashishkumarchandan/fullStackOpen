import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  beforeEach(() => {
    render(
      <Togglable buttonLabel="show...">
        <div>togglable content</div>
      </Togglable>
    )
  })

  test('renders its children', () => {
    screen.getByText('togglable content')
  })

  test('starts hidden', () => {
    const element = screen.getByText('togglable content')
    expect(element).not.toBeVisible()
  })

  test('becomes visible after clicking button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    expect(screen.getByText('togglable content')).toBeVisible()
  })
})
