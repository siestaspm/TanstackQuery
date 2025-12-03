import { StyleSheet } from "react-native";

export const createPostCardStyles = (colors) =>
  StyleSheet.create({
    container: {
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
      elevation: 3, // Android shadow
    },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    avatar: { width: 48, height: 48, borderRadius: 50 },
    userInfo: { marginLeft: 10 },
    name: { fontSize: 16, fontWeight: "600", color: colors.textPrimary },
    username: { fontSize: 13, color: colors.textSecondary },
    caption: { fontSize: 15, color: colors.caption, marginBottom: 12, lineHeight: 21 },
    postImage: { width: "100%", height: 200, borderRadius: 14, marginBottom: 12 },
    timestamp: { fontSize: 12, color: "#999", marginBottom: 14 },
    actionRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: "rgba(0,0,0,0.05)",
    },
    actionText: { fontSize: 16, color: colors.actionText },
  });
