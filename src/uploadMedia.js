import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Function to upload media to Firebase Storage with a unique ID.
 * @param {File} file - The media file to be uploaded.
 * @param {string} queryId - The unique query ID.
 * @returns {Promise<string>} - The download URL of the uploaded media file.
 */
export const uploadMedia = async (file, queryId) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `query_media/${queryId}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading media:", error);
    throw error;
  }
};
