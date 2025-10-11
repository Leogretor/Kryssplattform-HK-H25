import { db } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  documentId,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { PostComment } from "@/types/post";

export const uploadComment = async (comment: Omit<PostComment, "id">) => {
  try {
    const docRef = await addDoc(collection(db, "comments"), comment);
    console.log("Kommentar lastet opp med ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Feil ved opplasting av kommentar:", error);
    throw error;
  }
};

export const fetchCommentsByIds = async (commentIds: string[]) => {
  if (commentIds.length === 0) return [];

  try {
    const q = query(
      collection(db, "comments"),
      where(documentId(), "in", commentIds)
    );

    const querySnapshot = await getDocs(q);
    const comments: PostComment[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<PostComment, "id">),
    }));

    return comments;
  } catch (error) {
    console.error("Feil ved henting av kommentarer:", error);
    throw error;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    await deleteDoc(doc(db, "comments", commentId));
    console.log("Kommentar slettet:", commentId);
  } catch (error) {
    console.error("Feil ved sletting av kommentar:", error);
    throw error;
  }
};
