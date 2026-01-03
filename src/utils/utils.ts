// import ImagePicker from 'react-native-image-crop-picker';

export const extractNames = (value: string) => {
  if (!value) {
    return '';
  }
  const names = value?.split(' ');
  const initials = names?.map(name => name?.[0]?.toUpperCase());
  return initials?.join('');
};

export const delayPromise = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const onGalleryOpen = async (setProfileImage: any) => {
  // ImagePicker.openPicker({
  //   mediaType: 'photo',
  //   cropping: true,
  //   maxFiles: 1,
  //   freeStyleCropEnabled: true,
  //   size: true,
  // }).then((image: any) => {
  //   setProfileImage(image);
  // });
};

export const onCameraOpen = (setProfileImage: any) => {
  // ImagePicker.openCamera({
  //   mediaType: 'photo',
  //   freeStyleCropEnabled: true,
  //   size: true,
  //   maxFiles: 1,
  //   cropping: true,
  // }).then((image: any) => {
  //   setProfileImage(image);
  // });
};
