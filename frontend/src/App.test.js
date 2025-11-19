import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Mergington High School header', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { name: /Mergington High School/i });
  expect(headerElement).toBeInTheDocument();
});

test('renders activities portal description', () => {
  render(<App />);
  const descriptionElement = screen.getByText(/Extracurricular Activities Portal/i);
  expect(descriptionElement).toBeInTheDocument();
});

test('renders signup form', () => {
  render(<App />);
  const signupHeader = screen.getByText(/Sign Up for an Activity/i);
  expect(signupHeader).toBeInTheDocument();
});
