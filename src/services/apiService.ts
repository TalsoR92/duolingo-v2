// src/services/apiService.ts
const API_URL = "http://localhost:3000"; // http://localhost:3000 or https://duolingoendpoints-9a518b16e2f9.herokuapp.com

export interface Word {
	word: string;
	translation: string;
}

export const addWordsToDatabase = async (words: Word[], collectionName: string, password?: string): Promise<void> => {
	try {
		// S'assurer que la liste des mots est fournie
		if (!Array.isArray(words) || words.length === 0) {
			throw new Error("Invalid words array");
		}

		// Vérifier que le nom de la collection est fourni
		if (!collectionName) {
			throw new Error("Collection name is required");
		}

		// Préparer le corps de la requête avec les mots, le nom de la collection et le mot de passe (si fourni)
		const requestBody = {
			words,
			collectionName,
			password // Inclure le mot de passe dans le corps de la requête, s'il est fourni
		};

		const response = await fetch(`${API_URL}/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody), // Envelopper les mots, la collection et le mot de passe dans un objet
		});

		if (!response.ok) {
			// Si la réponse n'est pas "ok", on lance une erreur avec le message du serveur
			const errorData = await response.json();
			throw new Error(errorData.message || "Error adding words to the database");
		}

		// Optionnel : Vous pouvez retourner les données ajoutées si nécessaire
		const data = await response.json();
		console.log("Words added:", data);
	} catch (error) {
		console.error("Error:", error);
	}
};

export const getCollections = async (): Promise<string[]> => {
	try {
		const response = await fetch(`${API_URL}/users/collections`); // Endpoint pour récupérer les collections
		if (!response.ok) {
			throw new Error("Failed to fetch collections");
		}

		const data = await response.json();
		return data.collections; // Extraire la propriété "collections" de l'objet retourné
	} catch (error) {
		console.error("Error fetching collections:", error);
		return [];
	}
};