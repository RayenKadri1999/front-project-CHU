import { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";

export function useComments(modelName, entityId, refreshCallback) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch comments when component mounts or entityId changes
  useEffect(() => {
    if (entityId) {
      fetchComments();
    }
  }, [entityId, modelName]);

  const fetchComments = async () => {
    if (!entityId) return;
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/review/${modelName}/${entityId}/comments`,
        { headers: authHeader() }
      );
      setComments(response.data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      // If entity doesn't exist (404), start with empty comments
      if (error.response?.status === 404) {
        setComments([]);
      } else if (error.response?.status === 401) {
        console.warn('User not authenticated. Please log in to view comments.');
        setComments([]);
      } else if (error.response?.status === 400) {
        console.warn('Bad request:', error.response?.data?.message);
        setComments([]);
      } else {
        console.error('Failed to fetch comments:', error.response?.data?.message || error.message);
        setComments([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (message) => {
    if (!entityId || !message.trim()) return;
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:3000/api/review/${modelName}/${entityId}/comments`,
        { message: message.trim() },
        { headers: authHeader() }
      );
      // Refresh comments and entity data
      await fetchComments();
      if (refreshCallback) {
        refreshCallback();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      // If entity doesn't exist, show user-friendly message
      if (error.response?.status === 404) {
        alert('Cannot add comment: Patient record not found. Please save the form data first.');
      } else if (error.response?.status === 401) {
        alert('Please log in to add comments.');
      } else if (error.response?.status === 400) {
        alert('Bad request: ' + (error.response?.data?.message || 'Invalid request'));
      } else {
        alert('Failed to add comment. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const editComment = async (commentId, message) => {
    if (!entityId || !message.trim()) return;
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:3000/api/review/${modelName}/${entityId}/comments/${commentId}`,
        { message: message.trim() },
        { headers: authHeader() }
      );
      // Refresh comments and entity data
      await fetchComments();
      if (refreshCallback) {
        refreshCallback();
      }
    } catch (error) {
      console.error('Error editing comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    if (!entityId) return;
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:3000/api/review/${modelName}/${entityId}/comments/${commentId}`,
        { headers: authHeader() }
      );
      // Refresh comments and entity data
      await fetchComments();
      if (refreshCallback) {
        refreshCallback();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    comments,
    addComment,
    editComment,
    deleteComment,
    loading,
    fetchComments
  };
}
