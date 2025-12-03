import { StyleSheet } from "react-native";

export const mainStyles = (colors) => 

  StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: colors.background,
    padding: 16,
  },

  /* ----- Post Card ----- */
  postCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
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
    color: colors.textPrimary,
  },

  username: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  caption: {
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 12,
    lineHeight: 21,
  },

  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 14,
    marginBottom: 12,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.shadow,
  },

  actionText: {
    fontSize: 16,
    color: colors.actionText,
  },

  /* ----- Comments Card ----- */
  commentsCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    height: 300,
    // Subtle shadow (not too strong)
    shadowColor: colors.border,
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 60,
  },

  commentsHeader: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    color: colors.textPrimary,
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
    backgroundColor: colors.commentBubble,
    borderRadius: 14,
    padding: 12,
  },

  commentName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  commentUsername: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },

  commentText: {
    fontSize: 14,
    color: colors.caption,
    lineHeight: 20,
  },

  addCommentRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingTop: 10,
  borderTopWidth: 1,
  borderColor: colors.buttonText,
},

addCommentInput: {
  flex: 1,
  backgroundColor: colors.addCommentBg,
  paddingHorizontal: 12,
  paddingVertical: 10,
  borderRadius: 20,
  fontSize: 14,
},

addCommentBtn: {
  marginLeft: 10,
  backgroundColor: colors.button, // Twitter blue
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 20,
},

addCommentBtnText: {
  color: colors.cardBackground,
  fontWeight: "bold",
  fontSize: 14,
},

});
