import Loader from '../../src/components/Jobs/Loader/Loader'
import { render } from '@testing-library/react'

describe('<Loader />', () => {
  test('should render correctly', () => {
    const { container } = render(<Loader isSubmitted={ true } jobData={ false } />)
    let ball = container.querySelectorAll('.ball');
    let hidden = container.querySelectorAll('.hidden');
    expect(hidden.length).toBe(0);
    expect(ball.length).toBe(3);
  })

  test('should render correctly', () => {
    const { container } = render(<Loader isSubmitted={ false } jobData={ true } />)
    let loading = container.querySelectorAll('.loading');
    let hidden = container.querySelectorAll('.hidden');
    let ball = container.querySelectorAll('.ball');
    expect(hidden.length).toBe(1);
    expect(loading.length).toBe(1);
    expect(ball.length).toBe(3);
  })

})
