import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import './AddLesson.css';

export const AddLesson = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => console.log(data);

    return (
        <div className="AddLesson">
            <Typography variant="h1" gutterBottom>
                Add lesson
            </Typography>
            <Box
                component="form"
                className="AddLesson__form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '50ch' }
                }}
            >
                <TextField
                    label="Lesson title"
                    {...register('title')}
                    required
                />
                <TextField
                    label="Lesson description"
                    {...register('description')}
                    multiline
                    maxRows={8}
                    rows={8}
                />
                <TextField
                    label="Lesson homework"
                    {...register('homework')}
                    multiline
                    maxRows={8}
                    rows={8}
                />
                <TextField
                    required
                    label={
                        !!errors.link?.message
                            ? errors.link?.message?.toString()
                            : 'Lesson youtube link'
                    }
                    {...register('link', {
                        pattern: {
                            value: /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w\\-]+)(\S+)?$/i,
                            message: 'Should be youtube link'
                        }
                    })}
                    error={!!errors.link?.message}
                />
                <Button type="submit" variant="contained">
                    Add lesson
                </Button>
            </Box>
        </div>
    );
};
