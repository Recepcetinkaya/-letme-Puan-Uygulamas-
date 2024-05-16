import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [capturableData1, setCapturableData1] = useState('');
  const [capturableData2, setCapturableData2] = useState('');
  const [storedData, setStoredData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleProcessingAction = async () => {
    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAlIDUiTW6M9p6qb7mHsMCvqk0_OMO3MV0', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          capturableData1,
          capturableData2,
          returnSecureToken: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }

      const receivedData = await response.json();
      setStoredData(receivedData);
      setErrorMessage(null);
    } catch (error) {
      console.error('Processing error:', error);
      setErrorMessage(error.message);
    }
  };
}
