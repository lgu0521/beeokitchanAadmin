import { FirebaseStorage, getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ImageStoreageDTO } from "../dto/image-storage.dto";
import firebase from "../service/FirebaseConfig";

const useUploadStorage = async (ImageFile: File, id: string): Promise<ImageStoreageDTO> => {
  var imageData = {} as ImageStoreageDTO;
  const d: Date = new Date();
  try {
    const firestorage: FirebaseStorage = getStorage(firebase, "gs://jin-studio.appspot.com");
    const refStorage = ref(firestorage, "Project/" + d + id + ImageFile.name);
    await uploadBytes(refStorage, ImageFile);
    const downloadUrlPromise = await getDownloadURL(refStorage);
    imageData = {
      storageRef: refStorage.fullPath,
      fileName: refStorage.name,
      downloadUrl: await downloadUrlPromise,
    };
  } catch (e) {
    console.log(e);
  }

  return imageData;
};

export default useUploadStorage;
