import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from './context/context';

import * as authFns from './services/auth';
import * as petFns from './services/pets';

jest.mock('./services/auth');
jest.mock('./services/pets');

const mockUser = {
  id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'random@example.com',
};

test('user can sign in', async () => {
  authFns.getUser.mockReturnValue(null);
  authFns.authUser.mockReturnValue(mockUser);

  
  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  
  const emailInput = screen.getByLabelText('Email');
  fireEvent.change(emailInput, { target: { value: 'random@example.com' } });
  expect(emailInput.value).toBe('random@example.com');

  const passwordInput = screen.getByLabelText('Password');
  fireEvent.change(passwordInput, { target: { value: '123456' } });

  const button = screen.getByRole('button');
  fireEvent.click(button);

  const headerText = await screen.findByText('hello random@example.com');
  expect(headerText).toBeInTheDocument();

});

const fakePets = [
  {
    id: 1,
    name: 'Jessica',
    species: 'Mushroom',
    description: '#1 description',
    user_id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  },
];



test('user can add a pet', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  petFns.getPets.mockReturnValue(fakePets);
  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/pets/new']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  const nameInput = screen.getByLabelText('Name:');
  fireEvent.change(nameInput, { target: { value: 'cat' } });
  expect(nameInput.value).toBe('cat');

  const speciesInput = screen.getByLabelText('Species:');
  fireEvent.change(speciesInput, { target: { value: 'is cat' } });
  expect(speciesInput.value).toBe('is cat');

  const descriptionInput = screen.getByLabelText('Description:');
  fireEvent.change(descriptionInput, { target: { value: 'is sneaky' } });
  expect(descriptionInput.value).toBe('is sneaky');

  const button = screen.getByText('Save');
  fireEvent.click(button);

  const postText = await screen.findByText('Jessica');
  expect(postText).toBeInTheDocument();
});

test('user can sign out', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  petFns.getPets.mockReturnValue(fakePets);

  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/pets']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  const postElem = await screen.findByText('Jessica');
  expect(postElem).toBeInTheDocument();

  const button = screen.getByText('Sign Out');
  fireEvent.click(button);

  const postText = await screen.findByText('Email');
  expect(postText).toBeInTheDocument();
});