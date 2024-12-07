import { doc, getDoc } from "firebase/firestore";
import { db } from "../fierbase";

export const getBrands = async ({ id }) => {
  if (!id) {
    throw new Error("Invalid or missing id parameter");
  }

  try {
    const docRef = doc(db, `brands/${id}`);
    const data = await getDoc(docRef);

    if (data.exists()) {
      return data.data();
    } else {
      return null; // Document doesn't exist
    }
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw new Error("Failed to fetch brands");
  }
};
