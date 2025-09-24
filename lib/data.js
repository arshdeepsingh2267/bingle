import matchesData from "../store/matchesData";

// matches array (assuming matchesData holds the actual data)
export const matches = matchesData;

// function to get user by id
export const getUserById = (id) => matches.find((u) => u.id === String(id));
