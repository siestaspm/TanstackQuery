import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, RefreshControl, Dimensions } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "../styles/mainStyle";
import { useMemberStore } from "../store/useMemberStore";

const { width } = Dimensions.get("window");

const fetchPost = async (token) => {
  const endpoint = `https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/GetPostDetails`;
  const inputData = { token, post_id: 211, version_number: "2.2.6", user_type: "Member" };
  const response = await axios.post(endpoint, inputData);
  return response.data[0];
};

const hypePost = async (postId, token) => {
  const endpoint = `https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/HypePost`;
  const response = await axios.post(endpoint, { token, postId });
  return response.data;
};

const CommentItem = ({ comment }) => (
  <View style={styles.GlassCard}>
    {" "}
    <View style={styles.ContainerRow}>
      <Image source={comment.image_link ? { uri: comment.image_link } : null} style={[styles.ProfilePicturePost, { marginRight: 10 }]} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.contentText1, styles.fontWeight700, styles.primaryColor]}>{comment.username}</Text>
        <Text style={{ color: "#B68B4B", marginTop: 2 }}>{comment.comment}</Text>{" "}
      </View>{" "}
    </View>{" "}
  </View>
);

export default function ViewPostScreen() {
  const { memberData, setMemberData } = useMemberStore();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState("");

  const {
    data: post,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["post"],
    queryFn: () => fetchPost(memberData.token),
    enabled: !!memberData,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });

  const handleHype = async () => {
    if (!post) return;
    try {
      await hypePost(post.post_id, memberData.token);
      queryClient.invalidateQueries(["post"]);
    } catch (err) {
      console.log("Hype error:", err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    console.log("Submit comment:", newComment);
    setNewComment("");
    queryClient.invalidateQueries(["post"]);
  };

  if (!memberData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#202221" }}>
        <Text style={{ color: "#B68B4B" }}>No memberData set</Text>
        <TouchableOpacity onPress={() => setMemberData({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkiLCJuYmYiOjE3NjQzMTk5MDksImV4cCI6MTc2NjkxMTkwOSwiaXNzIjoiWHVyMzRQMSIsImF1ZCI6Ilh1cjQ0UFAifQ.zSqZ5gIsy6Yy9dmU-6GmshUNKGrXQHeqIDKw-QqcLzI" })} style={[styles.StatusButton, { marginTop: 10 }]}>
          {" "}
          <Text style={styles.StatusButtonText}>Set dummy memberData</Text>{" "}
        </TouchableOpacity>{" "}
      </View>
    );
  }

  if (isLoading) return <Text style={{ color: "#B68B4B" }}>Loading post...</Text>;
  if (error || !post) return <Text style={{ color: "#956E2F" }}>Error loading post: {String(error?.message)}</Text>;

  const renderHeader = () => (
    <View style={{ marginBottom: 15 }}>
      <View style={[styles.ContainerRow, { marginVertical: 12 }]}>
        <Image source={post.image_link ? { uri: post.image_link } : null} style={styles.ProfilePicturePost} />
        <View style={{ marginLeft: 12 }}>
          {" "}
          <Text style={styles.UsernameText}>{post.username}</Text>
          {post.display_name && <Text style={{ color: "#B68B4B" }}>{post.display_name}</Text>}{" "}
        </View>{" "}
      </View>

      {post.picture_1 && <Image source={{ uri: post.picture_1 }} style={styles.PostImage} resizeMode="cover" />}

      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TouchableOpacity onPress={handleHype} style={[styles.StatusButton, { marginRight: 12 }]}>
          <Text style={styles.StatusButtonText}>{`Hype (${post.number_of_hype})`}</Text>
        </TouchableOpacity>
      </View>

      {post.caption && (
        <View style={styles.CaptionContainer}>
          <Text style={[styles.UsernameText, { marginBottom: 4 }]}>{post.username}</Text>
          <Text style={styles.CaptionText}>{post.caption}</Text>
        </View>
      )}

      <View style={styles.GlassCard}>
        <TextInput
          placeholder="Add a comment..."
          placeholderTextColor="#956E2F"
          value={newComment}
          onChangeText={setNewComment}
          style={styles.InputComment}
          onSubmitEditing={handleAddComment}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={handleAddComment} style={{ marginTop: 5, alignSelf: "flex-end" }}>
          <Text style={styles.StatusButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider style={styles.SafeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <FlatList
          data={post.comments || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <CommentItem comment={item} />}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingTop: insets.top + 10, paddingBottom: insets.bottom + 10 }}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} tintColor="#B68B4B" />}
        />{" "}
      </KeyboardAvoidingView>{" "}
    </SafeAreaProvider>
  );
}
