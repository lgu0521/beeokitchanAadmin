import { FirebaseStorage, getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ImageStoreageDTO } from "../dto/image-storage.dto";
import firebase from "../service/FirebaseConfig";

const useDeleteStorage = async (imageEntity: ImageStoreageDTO) => {
  try {
    await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/delete/image", {
      method: "POST",
      body: JSON.stringify(imageEntity)
    });

    return true;

  } catch (e) {
    console.log(e);
  }


};

export default useDeleteStorage;
