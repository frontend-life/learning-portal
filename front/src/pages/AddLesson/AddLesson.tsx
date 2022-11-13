import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { Select } from '../../components/Select/Select';
import { useSuccessAdd } from '../../components/SuccessAdd/SuccessAdd';
import { ILesson, ITrack } from '../../types/api';
import { myRequest } from '../../utils/axios';

import s from './AddLesson.module.css';

export const AddLesson = () => {
    const { isSuccess, turnOn, SuccessAdd } = useSuccessAdd();
    const [tracks, setTracks] = useState<ITrack[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        myRequest.post('/lesson/create', data).then(turnOn);
    };

    useEffect(() => {
        myRequest.get('/track').then((tracks) => {
            setTracks(tracks as unknown as ITrack[]);
        });
    }, []);

    return (
        <MainBlockWrapper alignMain="left">
            <div className={s.root}>
                <h1 className={s.headerText}>Добавить урок</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Select
                        labelAlign="left"
                        htmlProps={{ label: 'Track' }}
                        rhfProps={{
                            ...register('track')
                        }}
                        options={tracks.map((t) => ({
                            id: t._id,
                            text: t.track_name
                        }))}
                    />
                    <Input
                        labelAlign="left"
                        inputProps={{ label: 'Lesson title' }}
                        rhfProps={{
                            ...register('title', {
                                required: true
                            })
                        }}
                        error={errors.title?.message as string}
                    />
                    <Input
                        labelAlign="left"
                        inputProps={{ label: 'Lesson description' }}
                        rhfProps={{
                            ...register('description', {
                                required: true
                            })
                        }}
                        error={errors.description?.message as string}
                    />
                    <Input
                        labelAlign="left"
                        inputProps={{ label: 'Lesson homework' }}
                        rhfProps={{
                            ...register('homework', {
                                required: true
                            })
                        }}
                        error={errors.homework?.message as string}
                    />
                    <Input
                        labelAlign="left"
                        inputProps={{ label: 'Lesson youtube link' }}
                        rhfProps={{
                            ...register('link', {
                                required: true
                            })
                        }}
                        error={errors.link?.message as string}
                    />
                    {/* in future <iframe
                        title="lesson_from_youtube"
                        width="420"
                        height="315"
                        src={'https://www.youtube.com/embed/' + watch('link')}
                        frameBorder="0"
                        allowFullScreen
                    /> */}
                    <div style={{ marginTop: '40px' }}>
                        <Button type="submit">Добавить урок</Button>
                    </div>
                </form>
                {isSuccess && <SuccessAdd />}
            </div>
        </MainBlockWrapper>
    );
};
