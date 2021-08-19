import Loader from '../../src/components/Jobs/Loader/Loader'
import { render } from '@testing-library/react'

describe('<Loader />', () => {
  test('should render correctly', () => {
    const { container } = render(<Loader />)
    let vid = container.querySelectorAll('div');
    expect(vid.length).toBe(4)
  })
})
