import RNFS from "react-native-fs";

export const normalizeImagePath = async (uri) => {
  try {
    if (!uri.startsWith("file://")) return uri;

    const tmpDir = `${RNFS.TemporaryDirectoryPath}/ReactNative`;
    await RNFS.mkdir(tmpDir); // make sure folder exists

    const destPath = `${tmpDir}/${Date.now()}.jpg`;

    // iOS requires the path without file:// for RNFS copyFile
    await RNFS.copyFile(uri.replace("file://", ""), destPath);

    return destPath; // use this path for fetch/upload
  } catch (err) {
    console.log("Error normalizing image path:", err);
    return uri;
  }
};