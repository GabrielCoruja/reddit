import React from 'react';
import { render, waitForDomChange, fireEvent, cleanup } from '@testing-library/react';
import App from './App';
import Provider from './context/Provider';

describe('head of page', () => {
  afterEach(cleanup);

  test('render title and buttons', async () => {
    const { getByText, getAllByText } = render(<Provider><App /></Provider>);
    expect(getByText(/Selected: reactjs/i)).toBeInTheDocument();
    expect(getByText(/frontend/i).tagName).toBe('BUTTON');
    expect(getAllByText(/reactjs/i)[1].tagName).toBe('BUTTON');
    expect(getByText(/refresh/i).tagName).toBe('BUTTON');
    expect(getByText(/Loading.../i)).toBeInTheDocument();

    await waitForDomChange();
    expect(getByText(/React ping pong game/i)).toBeInTheDocument();
    expect(getByText(/Spotify Mosaic App Personal Project/i)).toBeInTheDocument();
    expect(getByText(/Using IPC Main and Renderer/i)).toBeInTheDocument();

    fireEvent.click(getByText(/frontend/i));
    await waitForDomChange();
    expect(getByText(/Selected: Frontend/i)).toBeInTheDocument();
    expect(getByText(/A quick word on self promotion and spam/i)).toBeInTheDocument();
    expect(getByText(/A question about the distributed npm packages/i)).toBeInTheDocument();
    expect(getByText(/Understanding positioning in CSS/i)).toBeInTheDocument();
    expect(getByText(/Need help in mastering CSS/i)).toBeInTheDocument();
    expect(getByText(/I need guindance in my next step/i)).toBeInTheDocument();

    fireEvent.click(getByText(/reactjs/i))
    await waitForDomChange();
    expect(getByText(/Road to React: The one with Hooks/i)).toBeInTheDocument();
    expect(getByText(/React ping pong game/i)).toBeInTheDocument();
    expect(getByText(/Spotify Mosaic App Personal Project/i)).toBeInTheDocument();
    expect(getByText(/Using IPC Main and Renderer/i)).toBeInTheDocument();
  });

  test('refresh button', async () => {
    afterEach(cleanup);

    const { getByText, getAllByText, queryByTestId } = render(<Provider><App /></Provider>);
    await waitForDomChange();
    expect(getByText(/React ping pong game/i)).toBeInTheDocument();
    expect(getByText(/Spotify Mosaic App Personal Project/i)).toBeInTheDocument();
    expect(getByText(/Using IPC Main and Renderer/i)).toBeInTheDocument();

    fireEvent.click(getAllByText(/refresh/i)[0]);
    expect(getByText(/Loading.../i)).toBeInTheDocument();
    await waitForDomChange();
    expect(getByText(/React ping pong game/i)).toBeInTheDocument();
    expect(getByText(/Spotify Mosaic App Personal Project/i)).toBeInTheDocument();
    expect(getByText(/Using IPC Main and Renderer/i)).toBeInTheDocument();

    const date = (new Date().toLocaleTimeString()).substring(6, 0);
    const refreshDate = (queryByTestId(/data/i).innerHTML).substring(6, 0);
    expect(refreshDate).toBe(date);
  });
});
