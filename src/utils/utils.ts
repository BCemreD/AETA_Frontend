import { API_BASE_URL, IMAGES_PATH } from "./config";

export const getImageUrl = (imageName: string) => {
  if (!imageName) return ""; 
  return `${API_BASE_URL}${IMAGES_PATH}${imageName}`;
};
