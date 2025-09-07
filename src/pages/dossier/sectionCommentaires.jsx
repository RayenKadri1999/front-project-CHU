import React, { useState } from "react";
import {
    Paper,
    Typography,
    Stack,
    IconButton,
    TextField,
    Button,
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Send as SendIcon,
} from "@mui/icons-material";
import authService from "../../services/auth-service";

// props attendus :
// comments: [{ _id, message, createdAt, createdBy: { _id, username } }]
// onEdit: (commentId, newMessage) => void
// onDelete: (commentId) => void
// langue = français

const SectionCommentaires = ({ comments, onEdit, onDelete,  }) => {
    const [editingId, setEditingId] = useState(null);
    const [editContent, setEditContent] = useState("");
    const currentUserId = String(authService.getCurrentUser().id);

    const handleEdit = (id, content) => {
        setEditingId(id);
        setEditContent(content);
    };

    const handleSave = (id) => {
        if (editContent.trim()) {
            onEdit(id, editContent.trim());
            setEditingId(null);
            setEditContent("");
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("fr-FR", {
            dateStyle: "short",
            timeStyle: "short",
        });
    };

    return (
        <Stack spacing={2}>
            {comments.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                    Aucun commentaire pour le moment.
                </Typography>
            )}

            {comments.map((comment) => {
                const isOwner = comment.createdBy?._id === currentUserId;
                const isEditing = editingId === comment._id;

                return (
                    <Paper
                        key={comment._id}
                        variant="outlined"
                        sx={{ p: 2, borderRadius: 2 }}
                    >
                        <Stack spacing={1}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography variant="subtitle2">
                                    Dr. {comment.createdBy?.username || "Inconnu"}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {formatDate(comment.createdAt)}
                                </Typography>
                            </Stack>

                            {isEditing ? (
                                <>
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={2}
                                        value={editContent}
                                        onChange={(e) =>
                                            setEditContent(e.target.value)
                                        }
                                    />
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        justifyContent="flex-end"
                                    >
                                        <Button
                                            size="small"
                                            variant="text"
                                            onClick={() => setEditingId(null)}
                                        >
                                            Annuler
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            startIcon={<SendIcon />}
                                            onClick={() =>
                                                handleSave(comment._id)
                                            }
                                        >
                                            Enregistrer
                                        </Button>
                                    </Stack>
                                </>
                            ) : (
                                <Typography variant="body2">
                                    {comment.message}
                                </Typography>
                            )}

                            {isOwner && !isEditing && (
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent="flex-end"
                                >
                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            handleEdit(
                                                comment._id,
                                                comment.message
                                            )
                                        }
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => onDelete(comment._id)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            )}
                        </Stack>
                    </Paper>
                );
            })}
        </Stack>
    );
};

export default SectionCommentaires;
