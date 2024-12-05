import { doc, getDoc } from "firebase/firestore";
import { db } from "../fierbase";

export const getCategory = async ({ id }) => {
  if (!id) {
    throw new Error("Invalid or missing 'id' parameter");
  }

  try {
    const docRef = doc(db, `categories/${id}`);
    const data = await getDoc(docRef);

    if (data.exists()) {
      return data.data();
    } else {
      return null; // Document doesn't exist
    }
  } catch (error) {
    console.error("Error fetching category:", error);
    throw new Error("Failed to fetch category");
  }
};
