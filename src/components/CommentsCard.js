import { StyleSheet } from "react-native";

export const createCommentsCardStyles = (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.cardBackground,
      borderRadius: 18,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      height: 300,
      shadowColor: colors.shadow,
      shadowOpacity: 0.04,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 3 },
      marginBottom: 60,
      elevation: 3,
    },
    commentsHeader: { fontSize: 18, fontWeight: "700", marginBottom: 14, color: colors.textPrimary },
    commentRow: { flexDirection: "row", marginBottom: 16, alignItems: "flex-start" },
    commentAvatar: { width: 40, height: 40, borderRadius: 40, marginRight: 10 },
    commentBubble: { flex: 1, backgroundColor: colors.commentBubble, borderRadius: 14, padding: 12 },
    commentName: { fontSize: 14, fontWeight: "600", color: colors.textPrimary },
    commentUsername: { fontSize: 12, color: colors.textSecondary, marginBottom: 4 },
    commentText: { fontSize: 14, color: colors.caption, lineHeight: 20 },
    addCommentRow: { flexDirection: "row", alignItems: "center", paddingTop: 10, borderTopWidth: 1, borderColor: "#eee" },
    addCommentInput: {
      flex: 1,
      backgroundColor: colors.addCommentBg,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 20,
      fontSize: 14,
      color: colors.textPrimary,
    },
    addCommentBtn: {
      marginLeft: 10,
      backgroundColor: colors.button,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 20,
    },
    addCommentBtnText: { color: colors.buttonText, fontWeight: "bold", fontSize: 14 },
  });
