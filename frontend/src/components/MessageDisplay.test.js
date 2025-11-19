import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageDisplay from '../components/MessageDisplay';

describe('MessageDisplay Component', () => {
  test('renders success message correctly', () => {
    render(
      <MessageDisplay 
        message="Successfully signed up for Chess Club!" 
        type="success" 
        isVisible={true} 
      />
    );
    
    expect(screen.getByText('Successfully signed up for Chess Club!')).toBeInTheDocument();
  });

  test('renders error message correctly', () => {
    render(
      <MessageDisplay 
        message="Activity not found" 
        type="error" 
        isVisible={true} 
      />
    );
    
    expect(screen.getByText('Activity not found')).toBeInTheDocument();
  });

  test('does not render when isVisible is false', () => {
    render(
      <MessageDisplay 
        message="Some message" 
        type="info" 
        isVisible={false} 
      />
    );
    
    expect(screen.queryByText('Some message')).not.toBeInTheDocument();
  });

  test('does not render when message is null', () => {
    render(
      <MessageDisplay 
        message={null} 
        type="info" 
        isVisible={true} 
      />
    );
    
    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });

  test('renders info message by default', () => {
    render(
      <MessageDisplay 
        message="Info message" 
        isVisible={true} 
      />
    );
    
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });
});