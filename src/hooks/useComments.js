import axios from "axios";
import authHeader from "../services/auth-header";

export function useComments({ modelName, entityId, fetchEntity }) {
  const addComment = async (message) => {
    if (!entityId) return;
    await axios.post(
      `http://localhost:3000/api/review/${modelName}/${entityId}/comments`,
      { message },            // body/data
      { headers: authHeader() } // config with headers
    );
    await fetchEntity();
  };

  const editComment = async (commentId, message) => {
    if (!entityId) return;
    await axios.put(
      `http://localhost:3000/api/review/${modelName}/${entityId}/comments/${commentId}`,
      { message },
      { headers: authHeader() }
    );
    await fetchEntity();
  };

  const deleteComment = async (commentId) => {
    if (!entityId) return;
    await axios.delete(
      `http://localhost:3000/api/review/${modelName}/${entityId}/comments/${commentId}`,
      { headers: authHeader() }
    );
    await fetchEntity();
  };

  return {
    addComment,
    editComment,
    deleteComment,
  };
}
