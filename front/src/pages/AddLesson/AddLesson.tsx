import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ITrack } from '../../types/api';
import { myRequest } from '../../utils/axios';

import './AddLesson.css';

export const AddLesson = () => {
    const [tracks, setTracks] = useState<ITrack[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    const onSubmit = (data) => {
        myRequest.post('/lesson', data);
    };

    useEffect(() => {
        myRequest.get('/track').then((tracks) => {
            setTracks(tracks as unknown as ITrack[]);
        });
    }, []);

    return (
        <div className="AddLesson">
            <Typography variant="h1" gutterBottom textAlign="center">
                Add lesson
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Track
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                {...register('track', {
                                    value: ''
                                })}
                                required
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {tracks.map((track) => {
                                    return (
                                        <MenuItem
                                            key={track._id}
                                            value={track._id}
                                        >
                                            {track.track_name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
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
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label={
                                !!errors.link?.message
                                    ? errors.link?.message?.toString()
                                    : 'Lesson youtube link'
                            }
                            {...register('link')}
                            error={!!errors.link?.message}
                        />

                        <iframe
                            title="lesson_from_youtube"
                            width="420"
                            height="315"
                            src={
                                'https://www.youtube.com/embed/' + watch('link')
                            }
                            frameBorder="0"
                            allowFullScreen
                        />
                        <Button type="submit" variant="contained">
                            Add lesson
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};
