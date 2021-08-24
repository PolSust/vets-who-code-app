import Card from '../../src/components/Jobs/Card/Card'
import { render } from '@testing-library/react'


describe('<Card />', () => {
    let jobData ={
        created: new Date(),
        title: 'Test Card',
        company: {display_name: 'Company XYZ'},
        location: {display_name: 'Location'},
        description: 'main card info',
        redirect_url: 'http://example.com'
    };

  test('should render correctly', () => {
    const { container } = render(<Card jobData={jobData} />)
    let div = container.querySelectorAll('div');
    let gridItem = container.querySelectorAll('.grid-item');
    let btn = container.querySelectorAll('.btn');
    let gridContainer = container.querySelectorAll('.grid-container');
    expect(div.length).toBe(6);
    expect(gridItem.length).toBe(5);
    expect(btn.length).toBe(1);
    expect(gridContainer.length).toBe(1);
  })

});

//   test('should contain class hidden when isSubmitted is true', () => {
//     const { container } = renderIgnoringUnstableFlushDiscreteUpdates(<Video isSubmitted={true} />)
//     const videoTag = container.querySelector('.veteran-video ')
//     expect(videoTag.classList.contains('hidden')).toBe(true)
//   })
// })



// describe('<Footer />', () => {
//     test('should render correctly', () => {
//       const { container } = render(<Footer />)
//       expect(container.firstChild).toMatchSnapshot()
//     })
//   })
  