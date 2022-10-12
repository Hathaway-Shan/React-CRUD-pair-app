import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/context';

//import everything and alias it from a specific file
import * as authFunctions from './services/auth';
import * as petFunctions from './services/pets';

jest.mock('./services/auth');
jest.mock('./services/pets');

const mockUser = {
  id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'dog@example.com',
};

const mockPet = {
  id: '1',
  name: 'missingPet',
  species: '????',
  description: 'Just some hovering data glitching out the screen',
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

test.skip('users can sign out', async () => {
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

test('Users can add new pets', async () => {
  authFunctions.getUser.mockReturnValue(null);
  authFunctions.authUser.mockReturnValue(mockUser);
  petFunctions.getPets.mockReturnValue([mockPet]);

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

  //user is now signed in

  act(() => {
    /* fire events that update state */
    const addPetLink = screen.getByText(/add a pet/i);
    fireEvent.click(addPetLink);
  });
  /* assert on the output */
  const addPetHeading = await screen.findByText('Add New Pet');
  expect(addPetHeading).toBeInTheDocument();

  //name input
  const nameInput = screen.getByLabelText(/name:/i);
  fireEvent.change(nameInput, { target: { value: 'missingPet' } });
  expect(nameInput.value).toBe('missingPet');

  //species input
  const speciesInput = screen.getByLabelText(/species:/i);
  fireEvent.change(speciesInput, { target: { value: '????' } });
  expect(speciesInput.value).toBe('????');

  //description input
  const descriptionInput = screen.getByLabelText(/description:/i);
  fireEvent.change(descriptionInput, {
    target: { value: 'Just some hovering data glitching out the screen' },
  });
  expect(descriptionInput.value).toBe('Just some hovering data glitching out the screen');

  act(() => {
    /* fire events that update state */
    const savePet = screen.getByText(/save/i);
    fireEvent.click(savePet);
  });
  /* assert on the output */
  const missingPet = await screen.findByText('missingPet');
  expect(missingPet).toBeInTheDocument();
});
