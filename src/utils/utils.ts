import { API_BASE_URL, IMAGES_PATH } from "./config";

export const getImageUrl = (imageName?: string) => {

  if (!imageName) {
    return "https://placehold.co/400x200/cccccc/000000?text=Resim+Yok";
  }
  return `${API_BASE_URL}${IMAGES_PATH}${imageName}`;
};
