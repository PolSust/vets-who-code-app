import Loader from '../../src/components/Jobs/Loader/Loader'
import { render } from '@testing-library/react'

describe('<Loader />', () => {
  test('should render correctly', () => {
    const { container } = render(<Loader />)
    let div = container.querySelectorAll('div');
    expect(div.length).toBe(4)
  })
})
