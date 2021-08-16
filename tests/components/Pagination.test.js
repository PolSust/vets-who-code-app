import { render } from '@testing-library/react'
import Pagination from '../../src/components/Pagination'

describe('<Pagination />', () => {
  let pageContext = {
    currentPage: 1,
    totalPages: 2,
    minPage: 1,
    maxPage: 100,
    path: 'blog',
  }

  test('should render route correctly', () => {
    const { container } = render(<Pagination pageContext={pageContext} type={'route'} />)
    const navTags = container.querySelectorAll('nav');
    const anchorTags = container.querySelectorAll('a');
    const lineTags = container.querySelectorAll('li');
    expect(anchorTags.length).toBe(3);
    expect(navTags.length).toBe(1);
    expect(lineTags.length).toBe(3);
  })


  test('should render api correctly', () => {
    const { container } = render(<Pagination pageContext={pageContext} type={'api'} />)
    const navTags = container.querySelectorAll('nav');
    const spanTags = container.querySelectorAll('span');
    expect(spanTags.length).toBe(99);
    expect(navTags.length).toBe(1);
  })

})

