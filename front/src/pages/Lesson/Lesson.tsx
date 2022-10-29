import { Typography, Stack, TextField } from '@mui/material';

function Lesson() {
    return (
        <Stack spacing={2}>
            <Typography variant="h1">Lesson: 1</Typography>
            <Typography variant="subtitle1">Description</Typography>
            <iframe
                title="lesson_from_youtube"
                width="420"
                height="315"
                src="https://www.youtube.com/embed//w8QbsPx73nU?autoplay=1"
                frameBorder="0"
                allowFullScreen
            />
            <Typography variant="subtitle1">Homework</Typography>
            <TextField
                id="outlined-multiline-static"
                label="Write here your homework or comments"
                multiline
                rows={12}
                defaultValue="..."
            />
        </Stack>
    );
}

export default Lesson;
