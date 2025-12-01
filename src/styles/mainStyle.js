import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: "#F5F5F7",
    padding: 16,
  },

  /* ----- Post Card ----- */
  postCard: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },

  userInfo: {
    marginLeft: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },

  username: {
    fontSize: 13,
    color: "#666",
  },

  caption: {
    fontSize: 15,
    color: "#222",
    marginBottom: 12,
    lineHeight: 21,
  },

  postImage: {
    width: "100%",
    height: 300,
    borderRadius: 14,
    marginBottom: 12,
  },

  timestamp: {
    fontSize: 12,
    color: "#999",
    marginBottom: 14,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },

  actionText: {
    fontSize: 16,
    color: "#333",
  },

  /* ----- Comments Card ----- */
  commentsCard: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    height: 250,
    // Subtle shadow (not too strong)
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 60,
  },

  commentsHeader: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    color: "#111",
  },

  commentRow: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-start",
  },

  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
  },

  commentBubble: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    borderRadius: 14,
    padding: 12,
  },

  commentName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },

  commentUsername: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },

  commentText: {
    fontSize: 14,
    color: "#222",
    lineHeight: 20,
  },

  addCommentRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingTop: 10,
  borderTopWidth: 1,
  borderColor: "#eee",
},

addCommentInput: {
  flex: 1,
  backgroundColor: "#f2f2f2",
  paddingHorizontal: 12,
  paddingVertical: 10,
  borderRadius: 20,
  fontSize: 14,
},

addCommentBtn: {
  marginLeft: 10,
  backgroundColor: "#1d9bf0", // Twitter blue
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 20,
},

addCommentBtnText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 14,
},

});

export default styles;
