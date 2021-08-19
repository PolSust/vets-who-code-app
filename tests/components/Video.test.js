import Video from '../../src/components/Jobs/Video/Video'
import { render } from '@testing-library/react'

jest.mock('../../src/video/veteran-on-computer.mp4',() =>'veteran-on-computer.mp4')

describe('<Video />', () => {
  test('should render correctly', () => {
    const { container } = render(<Video isSubmitted={false} />)
    const videoTag = container.querySelectorAll('video')
    expect(videoTag.length).toBe(1)
  })
})
