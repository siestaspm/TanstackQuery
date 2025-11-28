import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
SafeArea: {
flex: 1,
backgroundColor: "#202221",
paddingHorizontal: 15,
},

// Glassy card for posts or comments
GlassCard: {
backgroundColor: "rgba(255,255,255,0.1)",
borderRadius: 25,
padding: 15,
marginBottom: 12,
borderWidth: 1,
borderColor: "rgba(182,139,75,0.3)",
shadowColor: "#000",
shadowOpacity: 0.25,
shadowRadius: 15,
shadowOffset: { width: 0, height: 10 },
backdropFilter: "blur(10px)", // iOS only effect; not all RN supports
},

ContainerRow: {
flexDirection: "row",
alignItems: "center",
},

ProfilePicturePost: {
width: 55,
height: 55,
borderRadius: 30,
backgroundColor: "rgba(200,200,200,0.15)",
borderWidth: 1,
borderColor: "rgba(182,139,75,0.5)",
},

contentText1: {
fontSize: 16,
color: "#B68B4B",
},

fontWeight700: {
fontWeight: "700",
},

primaryColor: {
color: "#956E2F",
},

accentColor: {
color: "#B68B4B",
},

StatusButton: {
backgroundColor: "rgba(182,139,75,0.85)",
paddingVertical: 10,
paddingHorizontal: 20,
borderRadius: 30,
alignItems: "center",
justifyContent: "center",
shadowColor: "#B68B4B",
shadowOpacity: 0.5,
shadowRadius: 12,
shadowOffset: { width: 0, height: 6 },
},

StatusButtonText: {
color: "#202221",
fontWeight: "600",
fontSize: 14,
},

InputComment: {
backgroundColor: "rgba(255,255,255,0.15)",
borderRadius: 20,
padding: 12,
color: "#B68B4B",
fontSize: 14,
marginBottom: 5,
shadowColor: "#B68B4B",
shadowOpacity: 0.2,
shadowRadius: 8,
shadowOffset: { width: 0, height: 3 },
},

PostImage: {
width: width - 30,
height: width - 30,
borderRadius: 25,
marginBottom: 12,
borderWidth: 1,
borderColor: "rgba(182,139,75,0.3)",
},

CaptionContainer: {
backgroundColor: "rgba(255,255,255,0.08)",
padding: 12,
borderRadius: 20,
marginBottom: 15,
shadowColor: "#000",
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 6,
},

CaptionText: {
color: "#B68B4B",
fontSize: 14,
},

UsernameText: {
color: "#956E2F",
fontWeight: "700",
},
});

export default styles;
