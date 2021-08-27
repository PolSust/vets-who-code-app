import React from 'react';
import { render, screen, fireEvent, waitFor, act} from '@testing-library/react'
import Form from '../../../src/components/Jobs/Form/Form'


const mockLogin = jest.fn((submit, page) => {
  return Promise.resolve({ submit, page });
});

describe("Form", () => {
  const { container } = render(<Form formData={mockLogin}/>)
   const zipCodeInput = container.querySelector('#zipCode')
   const remoteCheckbox = container.querySelector('#inlineFormCheck')
   const distanceSelect = container.querySelector('#distanceSelect')
  
   fireEvent.input(zipCodeInput, {target: { value: '02901' },})
   fireEvent.input(remoteCheckbox, {target: { value: false },})
   fireEvent.input(distanceSelect, {target: { value: 40 },})

  it("should display required error when value is invalid", async () => {

    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() =>  expect(mockLogin).toHaveBeenCalled());
  });
});



// it("Form can be submited & input field is modifiable", () => {

//   const mockSubmit = jest.fn((x, y)=>{
//     return Promise.resolve({ x, y });
//   });
//   const { debug, queryByTestId } = render(<Form formData={mockSubmit}/>);

//   //fireEvent.change(queryByTestId("zipCode"), { target: { value: '97504' } }); // invoke handleChange
//   fireEvent.submit(queryByTestId("form"));
//  // expect(mockSubmit.mock.calls).toEqual([[{zipCode: '97504'}]]); // Test if handleChange works
//   expect(mockSubmit).toHaveBeenCalled(); // Test if handleSubmit has been called  


// });



//describe('<Form />', () => {
//  test('should submit job search form', async () => {
  //  const  mockSubmit = jest.fn();
   // const { container, getByTestId } = render(<Form formData={mockSubmit}/>)
    // const jobSearchForm = container.querySelector('#jobForm')
    // const zipCodeInput = container.querySelector('#zipCode')
    // const remoteCheckbox = container.querySelector('#inlineFormCheck')
    // const distanceSelect = container.querySelector('#distanceSelect')
    // const distanceSelectOptions = container.querySelectorAll('option')
    
    // // fireEvent.input(zipCodeInput, {
    // //   target: { value: '02901' },
    // })

    // fireEvent.input(remoteCheckbox, {
    //   target: { checked: true },
    // })
  
    // fireEvent.change(distanceSelect, {
    //   target: { value: 1 },
    // })
    
    //fireEvent.submit(getByTestId("form"));
    //fireEvent.click(container.querySelector("form"));

   //await waitFor(()=> expect(mockSubmit).toHaveBeenCalled())
   // expect(zipCodeInput.value).toBe('02901')
   // expect(remoteCheckbox.checked).toBe(true)
   // expect(distanceSelectOptions[0].selected).toBe(true)
   // expect(distanceSelectOptions[1].selected).toBe(false)

   // console.log(document.body.innerHTML)
//  })
//})
