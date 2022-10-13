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

const mockPetArray = [
  {
    id: 2,
    name: 'testPet1',
    species: 'test',
    description: 'test',
  },
  {
    id: 3,
    name: 'testPet2',
    species: 'test',
    description: 'test',
  },
];

const mockPet = {
  id: '1',
  name: 'missingPet',
  species: '????',
  description: 'Just some hovering data glitching out the screen',
  owner_id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
};

const editMockPet = {
  id: '1',
  name: 'missingPet',
  species: '????',
  description: 'had to restart the game',
  owner_id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
};

test('user can sign in', async () => {
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

test('users can see a list of pets', async () => {
  authFunctions.getUser.mockReturnValue(mockUser);
  petFunctions.getPets.mockReturnValue(mockPetArray);

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

  await screen.findByText('testPet1');
  await screen.findByText('testPet2');
});

test('Users can add new pets', async () => {
  authFunctions.getUser.mockReturnValue(null);
  authFunctions.authUser.mockReturnValue(mockUser);
  petFunctions.getPets.mockReturnValue([mockPet]);
  petFunctions.updatePet.mockReturnValue();

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
test('Users can update their own pets', async () => {
  authFunctions.getUser.mockReturnValue(null);
  authFunctions.authUser.mockReturnValue(mockUser);
  petFunctions.getPets.mockReturnValue([editMockPet]);
  petFunctions.getPetById(mockPet);
  petFunctions.updatePet(editMockPet);

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
  let descriptionInput = screen.getByLabelText(/description:/i);
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
  let missingPet = await screen.findByText('missingPet');
  expect(missingPet).toBeInTheDocument();

  act(() => {
    /* fire events that update state */
    const editPet = screen.getByText(/edit/i);
    fireEvent.click(editPet);
  });
  /* assert on the output */
  expect(nameInput.value).toBe('missingPet');
  expect(speciesInput.value).toBe('????');
  expect(descriptionInput.value).toBe('Just some hovering data glitching out the screen');

  //name input
  descriptionInput = screen.getByLabelText(/description:/i);
  fireEvent.change(descriptionInput, { target: { value: 'had to restart the game' } });
  expect(descriptionInput.value).toBe('had to restart the game');
  act(() => {
    /* fire events that update state */
    const savePet = screen.getByText(/save/i);
    fireEvent.click(savePet);
  });
  /* assert on the output */
  missingPet = await screen.findByText('had to restart the game');
  expect(missingPet).toBeInTheDocument();
});
test.only('users can delete their pets', async () => {
  authFunctions.getUser.mockReturnValue(null);
  authFunctions.authUser.mockReturnValue(mockUser);
  petFunctions.getPets.mockReturnValue([mockPet]);
  petFunctions.getPetById(mockPet);
  petFunctions.deletePet.mockReturnValue(mockPet.id);

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
  let descriptionInput = screen.getByLabelText(/description:/i);
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
  let missingPet = await screen.findByText('missingPet');
  expect(missingPet).toBeInTheDocument();

  act(() => {
    /* fire events that update state */
    const editPet = screen.getByText(/edit/i);
    fireEvent.click(editPet);
  });
  /* assert on the output */
  expect(nameInput.value).toBe('missingPet');
  expect(speciesInput.value).toBe('????');
  expect(descriptionInput.value).toBe('Just some hovering data glitching out the screen');
  act(() => {
    /* fire events that update state */
    const deletePet = screen.getByText(/delete/i);
    fireEvent.click(deletePet);
  });
  expect(petFunctions.deletePet).toBeCalled();
});
