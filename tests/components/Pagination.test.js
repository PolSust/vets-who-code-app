import Pagination from '../../src/components/Pagination'
import { render } from '@testing-library/react'
import React from 'react';
import ReactDOM from 'react-dom';

describe('<Pagination />', () => {
    let pageContext = {
        currentPage: 1, 
        totalPages: 2, 
        minPage: 1, 
        maxPage: 100,
        path: 'path'
    }
  test('should render correctly', () => {
    const { container } = render(<Pagination pageContext={pageContext} type={"route"} />)
    const navTags = container.querySelectorAll('nav')
    expect(navTags.length).toBe(1);
  })
})
