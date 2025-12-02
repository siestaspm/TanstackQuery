import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import * as ImagePicker from "react-native-image-picker";
import NetInfo from "@react-native-community/netinfo";
import styles from "../styles/mainStyle";
import { useCreatePost } from "../hooks/useCreatePost";
import { useMemberStore } from "../store/useMemberStore";
import { usePostStore } from "../store/usePostStore";
import { normalizeImagePath } from '../utils/normalizedImagePath';
import ImageCropPicker from "react-native-image-crop-picker";
export default function CreatePostScreen() {
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]);
  const { memberData } = useMemberStore();
  const mutation = useCreatePost();
  const uploadQueue = usePostStore((state) => state.uploadQueue);
  const retryPending = usePostStore((state) => state.retryPending);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) retryPending();
    });
    return () => unsubscribe();
  }, []);


  const pickImage = () => {
    ImageCropPicker.openCamera({
      width: 2000,
      height: 2000,
      cropping: true,
      compressImageMaxWidth: 2000, 
      compressImageMaxHeight: 2000, 
    }).then(image => {
      setImages(image.path);
    }).catch(error => {
      console.log(error);
    });
  };

  const submitPost = () => {
    mutation.mutate({ caption, username: 'tutywan', images, token: memberData });
    setCaption("");
    setImages([]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.postCard}>
        <TextInput
          style={[styles.caption, { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 12 }]}
          placeholder="What's on your mind?"
          multiline
          value={caption}
          onChangeText={setCaption}
        />

        {images.map((img, i) => (
          <Image key={i} source={{ uri: img }} style={styles.postImage} />
        ))}

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: "#eee", borderRadius: 12 }}
            onPress={pickImage}
            disabled={mutation.isLoading}
          >
            <Text style={{ color: "#333" }}>Upload Image</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ padding: 10, backgroundColor: "#1d9bf0", borderRadius: 12 }}
            onPress={submitPost}
            disabled={mutation.isLoading}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Post</Text>
          </TouchableOpacity>
        </View>

        {/* Queue Progress Bars */}
        {uploadQueue.map((post, i) => (
          <View key={i} style={{ marginTop: 15 }}>
            <View style={{ height: 10, backgroundColor: "#eee", borderRadius: 5 }}>
              <View
                style={{
                  height: 10,
                  width: `${post.progress * 100}%`,
                  backgroundColor: post.status === "failed" ? "red" : "#1d9bf0",
                  borderRadius: 5,
                }}
              />
            </View>
            {post.status === "failed" && (
              <Text style={{ color: "red", marginTop: 5, textAlign: "center" }}>
                Upload failed. Will retry when online.
              </Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
