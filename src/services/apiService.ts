// src/services/apiService.ts
const API_URL = "https://duolingoendpoints-9a518b16e2f9.herokuapp.com"; // Remplacez cela par l'URL de votre API

export interface Word {
	word: string;
	translation: string;
}

export const addWordsToDatabase = async (words: Word[]): Promise<void> => {
	try {
		// S'assurer que la liste des mots est fournie
		if (!Array.isArray(words) || words.length === 0) {
			throw new Error("Invalid words array");
		}

		const response = await fetch(`${API_URL}/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ words }), // Envelopper les mots dans un objet
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
