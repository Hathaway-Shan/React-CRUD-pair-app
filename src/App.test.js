import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/context';

//import everything and alias it from a specific file
import * as authFunctions from './services/auth';
import * as petFunctions from './services/pets';

jest.mock('./services/auth');

const mockUser = {
  id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'dog@example.com',
};

test.skip('user can sign in', async () => {
  authFunctions.getUser.mockReturnValue(null);
  authFunctions.authUser.mockReturnValue(mockUser);

  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  const headerElem = screen.getByText(/Welcome to Monster Pets!/i);
  expect(headerElem).toBeInTheDocument();

  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'dog@example.com' } });
  expect(emailInput.value).toBe('dog@example.com');

  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: '123456' } });

  const button = screen.getByRole('button');
  fireEvent.click(button);

  const headerText = await screen.findByText('hello dog@example.com');
  expect(headerText).toBeInTheDocument();
});

test('users can sign out', async () => {
  authFunctions.getUser.mockReturnValue(null);
  authFunctions.authUser.mockReturnValue(mockUser);

  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  const headerElem = screen.getByText(/Welcome to Monster Pets!/i);
  expect(headerElem).toBeInTheDocument();

  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'dog@example.com' } });
  expect(emailInput.value).toBe('dog@example.com');

  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(passwordInput, { target: { value: '123456' } });

  const button = screen.getByRole('button');
  fireEvent.click(button);

  let headerText = await screen.findByText('hello dog@example.com');
  expect(headerText).toBeInTheDocument();

  //user is now logged in

  act(() => {
    /* fire events that update state */
    const signOutButton = screen.getByText(/sign out/i);
    fireEvent.click(signOutButton);
  });
  /* assert on the output */
  headerText = await screen.findByText('Welcome to Monster Pets!');
  expect(headerText).toBeInTheDocument();
});

test.skip('renders learn react link', () => {
  // render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
