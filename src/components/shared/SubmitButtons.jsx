import { Button, Stack, Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SendIcon } from "lucide-react";
import { useState } from "react";
import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";

// Style the autosizing textarea so it looks like the TextField
const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
    width: "100%",
    fontSize: "0.95rem",
    fontFamily: theme.typography.fontFamily,
    resize: "none",
    outline: "none",
    border: "none",
    padding: theme.spacing(1),
    backgroundColor: "transparent",
    "&:focus": {
        outline: "none",
    },
}));

const SubmitButtons = ({
    handleSubmit,
    isDataAvailable,
    setIsEditable,
    isEditable,
    mode = "Edit",
    onSubmitComment,
    onApprove,
}) => {
    const toggleEditMode = () => {
        setIsEditable((prev) => !prev);
    };

    const [commentMode, setCommentMode] = useState(false);
    const [comment, setComment] = useState("");
    const [focused, setFocused] = useState(false);

    const toggleCommentMode = () => {
        setCommentMode((prev) => !prev);
        setComment("");
    };

    const handleSubmitComment = () => {
        if (comment.trim()) {
            onSubmitComment?.(comment);
            setComment("");
            setCommentMode(false);
        }
    };

    return (
        <Box mt={3}>
            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    startIcon={<SendIcon />}
                    type={handleSubmit ? "button" : "submit"} // if handleSubmit exists, prevent default form submit
                    onClick={handleSubmit ? handleSubmit : undefined} // call handleSubmit if provided
                    disabled={!isEditable}
                >
                    {isDataAvailable ? "Mettre à jour" : "Créer"}
                </Button>

                <Button
                    variant={isEditable ? "outlined" : "contained"}
                    onClick={toggleEditMode}
                >
                    {isEditable ? "Annuler" : "Modifier"}
                </Button>

                {mode === "Review" && (
                    <>
                        <Button variant="outlined" onClick={onApprove}>
                            Approuver
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={toggleCommentMode}
                        >
                            A refaire
                        </Button>
                    </>
                )}
            </Stack>

            {commentMode && (
                <Paper
                    variant="outlined"
                    sx={{
                        mt: 2,
                        p: 2,
                        borderRadius: 2,
                        borderColor: focused ? "primary.main" : "divider",
                        boxShadow: focused ? 2 : 0,
                        transition: "all 0.2s ease",
                    }}
                >
                    <StyledTextarea
                        minRows={3}
                        maxRows={18}
                        placeholder="Écrire un commentaire…"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                    />
                    <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                        mt={1}
                    >
                        <Button
                            size="small"
                            variant="text"
                            onClick={toggleCommentMode}
                        >
                            Annuler
                        </Button>
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<SendIcon size={16} />}
                            onClick={handleSubmitComment}
                        >
                            Envoyer
                        </Button>
                    </Stack>
                </Paper>
            )}
        </Box>
    );
};

export default SubmitButtons;
