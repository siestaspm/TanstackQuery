import React, { useRef, useState } from "react";
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, ActivityIndicator, RefreshControl, Keyboard } from "react-native";
import styles from "../styles/mainStyle";
import { useMemberStore } from "../store/useMemberStore";
import { usePost, useComments, useAddComment, useHypePost } from "../hooks/query/usePost";
import { debounce } from "lodash"; // or implement your own debounce

export default function ViewPostScreen() {
  const { memberData } = useMemberStore();
  const flatListRef = useRef(null);
  const [newComment, setNewComment] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const lastActionRef = useRef(null);


  const { data: post, isLoading: isPostLoading } = usePost(memberData);
  const { hypeMutation, unhypeMutation } = useHypePost(post?.post_id, memberData, "tutywan");

  const {
    data: commentsPages,
    fetchNextPage,
    hasNextPage,
    refetch: refetchComments,
    isFetchingNextPage,
    isRefetching,
  } = useComments(post?.post_id, memberData);
  const addCommentMutation = useAddComment(post?.post_id, memberData);

  const comments = commentsPages?.pages?.flatMap((p) => p.comments) || [];

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    addCommentMutation.mutate({
      token: memberData,
      comment: newComment.trim(),
      username: "tutywan",
      post_id: post.post_id,
    });
    setNewComment("");
    Keyboard.dismiss();
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 300);
  };

  const handleRefreshComments = async () => {
    setIsRefreshing(true);
    await refetchComments();
    setIsRefreshing(false);
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  const triggerHypeChange = debounce(() => {
  if (!post) return;

  const alreadyHyped = post.hyped_by?.some(h => h.hyped_by_username === "tutywan");

  if (lastActionRef.current === "hype" && !alreadyHyped) {
    hypeMutation.mutate({ post_id: post.post_id, token: memberData, username: "tutywan" });
  } else if (lastActionRef.current === "unhype" && alreadyHyped) {
    unhypeMutation.mutate({ post, post_id: post.post_id, token: memberData, username: "tutywan" });
  }

  lastActionRef.current = null; // reset after calling
}, 500);

  if (isPostLoading)
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" />
      </View>
    );

    const alreadyHyped = post.hyped_by?.some(h => h.hyped_by_username === "tutywan");
    const hypeCount = post.number_of_hype || 0;
    let hypeText = "";

    if (alreadyHyped) {
    if (hypeCount === 1) { 
      console.log('Hype count', post.number_of_hype)
      hypeText = "Hyped by you";
    } 
    else { 
      hypeText = `Hyped by you, ${hypeCount - 1} other${hypeCount - 1 > 1 ? "s" : ""}`;
    }
    } else {
    if (hypeCount === 0) hypeText = "Be the first to hype";
    else hypeText = `Hyped by ${hypeCount} ${hypeCount > 1 ? "people" : "person"}`;
    }


  return (
    <View style={styles.container}>
      <View style={styles.postCard}>
        <View style={styles.header}>
          <Image source={{ uri: post?.image_link }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{post?.display_name}</Text> <Text style={styles.username}>@{post?.username}</Text>
          </View>
        </View>
        <Text style={styles.caption}>{post?.caption}</Text>
        {post?.picture_1 && <Image source={{ uri: post.picture_1 }} style={styles.postImage} />}
        <View style={styles.likeSection}>
          <TouchableOpacity
            onPress={() => {
              lastActionRef.current = alreadyHyped ? "unhype" : "hype";
              triggerHypeChange();
            }}
          >
            <Text>{alreadyHyped ? "💛" : "🤍"} • {hypeText}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.commentsCard}>
        <Text style={styles.commentsHeader}>Comments</Text>
        <FlatList
          ref={flatListRef}
          data={comments}
          keyExtractor={(item, idx) => item?.id?.toString() || `c-${idx}`}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          refreshControl={
            <RefreshControl refreshing={isRefetching || isRefreshing} onRefresh={handleRefreshComments} tintColor="#B68B4B" colors={["#B68B4B"]} />
          }
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator style={{ marginVertical: 10 }} /> : null}
          contentContainerStyle={{ paddingBottom: 10 }}
          renderItem={({ item }) => (
            <View style={styles.commentRow}>
              <Image
                source={{ uri: item.image_link || "https://via.placeholder.com/40" }}
                style={[styles.commentAvatar, item.isSkeleton && { opacity: 0.35, backgroundColor: "#ddd" }]}
              />
              <View style={[styles.commentBubble, item.isSkeleton && { backgroundColor: "#E3E3E8" }]}>
                {!item.isSkeleton && <Text style={styles.commentUsername}>@{item.username}</Text>}
                {item.isSkeleton ? (
                  <View style={{ width: 120, height: 12, backgroundColor: "#ccc", borderRadius: 4 }} />
                ) : (
                  <Text style={styles.commentText}>{item.comment}</Text>
                )}
              </View>
            </View>
          )}
        />
        <View style={styles.addCommentRow}>
          <TextInput
            style={styles.addCommentInput}
            placeholder="Add a comment..."
            placeholderTextColor="#999"
            value={newComment}
            onChangeText={setNewComment}
            onSubmitEditing={handleAddComment}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.addCommentBtn} onPress={handleAddComment} disabled={addCommentMutation.isLoading}>
            {addCommentMutation.isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.addCommentBtnText}>Send</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
