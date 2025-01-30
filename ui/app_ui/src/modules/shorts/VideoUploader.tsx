// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { useVideoPlayer, VideoView } from "expo-video";
// import React, { useEffect, useState } from "react";
// import { Alert } from "react-native";
// import { View } from "react-native-reanimated/lib/typescript/Animated";
// import Button from "@/components/ui/Button";
// type Props = {};

// const VideoUploader = (props: Props) => {
//     const [hasCameraPermission, setHasCameraPermission] = useState<
//         boolean | null
//     >(null);
//     const [hasLibraryPermission, setHasLibraryPermission] = useState<
//         boolean | null
//     >(null);
//     const [cameraRef, setCameraRef] = useState<any | null>(null);
//     const [isCameraOpen, setIsCameraOpen] = useState(false);
//     const [isCameraReady, setIsCameraReady] = useState(false);

//     const [videoUri, setVideoUri] = useState<string>("");

//     const player = useVideoPlayer(videoUri, (player) => {
//         player.loop = true;
//     });

//     useEffect(() => {
//         (async () => {
//             // const cameraStatus = await Camera.requestCameraPermissionsAsync();
//             // setHasCameraPermission(cameraStatus.status === "granted");

//             const libraryStatus =
//                 await ImagePicker.requestMediaLibraryPermissionsAsync();
//             setHasLibraryPermission(libraryStatus.status === "granted");
//         })();
//     }, []);

//     useEffect(() => {
//         player.replace(videoUri);
//         console.log({ player });
//     }, [videoUri]);

//     const handlePickVideo = async () => {
//         if (!hasLibraryPermission) {
//             Alert.alert("Quyền truy cập thư viện bị từ chối.");
//             return;
//         }

//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//             allowsEditing: true,
//             quality: 1,
//         });

//         if (!result.canceled) {
//             const videoDuration = await getVideoDuration(result.assets[0].uri);
//             if (videoDuration <= 60) {
//                 setVideoUri(result.assets[0].uri);
//                 console.log("Video hợp lệ:", result.assets[0].uri);
//             } else {
//                 Alert.alert("Chỉ cho phép video dưới 1 phút.");
//             }
//         }
//     };

//     // const handleRecordVideo = async () => {
//     //     if (!hasCameraPermission) {
//     //         Alert.alert("Quyền truy cập camera bị từ chối.");
//     //         return;
//     //     }
//     //     setIsCameraOpen(true);
//     // };

//     // const stopRecording = async () => {
//     //     // if (cameraRef && isCameraReady) {
//     //     // }
//     //     const video = await cameraRef.recordAsync({ maxDuration: 60 });
//     //     setIsCameraOpen(false);
//     //     console.log("Video recorded:", video.uri);
//     // };

//     const getVideoDuration = async (uri: string) => {
//         // Tính toán độ dài video ở đây nếu cần, có thể sử dụng `react-native-video` hoặc thư viện tương tự.
//         // Ví dụ: kiểm tra metadata của video bằng `expo-av`.
//         // Đây là đoạn placeholder.
//         return 30; // Trả về 30s như ví dụ.
//     };

//     // if (isCameraOpen) {
//     //     return (
//     //         <CameraView
//     //             style={{ flex: 1 }}
//     //             ref={(ref) => setCameraRef(ref)}
//     //             onCameraReady={() => setIsCameraReady(true)}
//     //             // type={Camera.Constants.Type.back}
//     //         >
//     //             <View>
//     //                 <TouchableOpacity onPress={stopRecording}>
//     //                     <Text>Dừng quay</Text>
//     //                 </TouchableOpacity>
//     //             </View>
//     //         </CameraView>
//     //     );
//     // }

//     return (
//         <View>
//             <Button variant="ghost" onPress={handlePickVideo}>
//                 <MaterialCommunityIcons
//                     name="video-plus-outline"
//                     size={24}
//                     color="white"
//                 />
//             </Button>
//             <VideoView
//                 style={{
//                     width: 200,
//                     height: 200,
//                 }}
//                 player={player}
//                 allowsFullscreen
//                 allowsPictureInPicture
//             />
//         </View>
//     );
// };

// export default VideoUploader;
