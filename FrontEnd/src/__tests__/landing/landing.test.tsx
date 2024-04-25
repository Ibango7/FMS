import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Landing from '../../components/landing';
 
// Test to check if landing page renders with a heading successfully
describe('Page', () => {
  it('renders a heading', () => {
    render(<Landing />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})