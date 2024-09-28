// src/services/apiService.ts
const API_URL = 'http://localhost:5000'; // Remplacez cela par l'URL de votre API

interface Word {
  word: string;
  translation: string;
}

// Fonction pour ajouter des mots à la base de données
export const addWordToDatabase = async (newWord: Word): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/api/words`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWord),
    });

    if (!response.ok) {
      throw new Error('Error adding word to the database');
    }

    // Optionnel : Vous pouvez retourner les données ajoutées si nécessaire
    const data = await response.json();
    console.log('Word added:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Vous pouvez ajouter d'autres fonctions ici pour interagir avec l'API
