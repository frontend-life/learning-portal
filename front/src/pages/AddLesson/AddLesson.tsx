import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Editor } from '../../components/Editor/Editor';
import { Input } from '../../components/Input/Input';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { Select } from '../../components/Select/Select';
import { useSuccessAdd } from '../../components/SuccessAdd/SuccessAdd';
import { useLessonsContext } from '../../store/LessonsContext';
import { ICourse, ILesson } from '../../types/api';
import { myRequest } from '../../utils/axios';
import { PATHS } from '../../utils/paths';

import s from './AddLesson.module.css';

export const AddLesson = () => {
    const { state: lessonToEdit }: { state: ILesson } = useLocation();
    const { setLessons } = useLessonsContext();
    const navigate = useNavigate();

    const { isSuccess, turnOn, SuccessAdd } = useSuccessAdd();
    const [courses, setCourses] = useState<ICourse[]>([]);
    const {
        register,
        setValue,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: lessonToEdit || {}
    });

    const onSubmit = (data: ILesson) => {
        if (lessonToEdit) {
            const editData = {
                title: data.title,
                course: data.course,
                description: data.description,
                homework: data.homework,
                link: data.link
            };
            myRequest
                .put(`/lesson?lessonId=${lessonToEdit._id}`, editData)
                .then(turnOn)
                .then(() => {
                    setLessons((prev) => {
                        return prev.map((l) => {
                            if (l._id === lessonToEdit._id) {
                                return {
                                    ...l,
                                    ...editData
                                };
                            }
                            return l;
                        });
                    });
                })
                .then(() => {
                    navigate(PATHS.lessons);
                });
            return;
        }
        myRequest.post('/lesson/create', data).then(turnOn);
    };

    useEffect(() => {
        myRequest.get('/course/courses').then((tracks) => {
            setCourses(tracks as unknown as ICourse[]);
        });
    }, []);

    const action = lessonToEdit ? 'Изменить' : 'Добавить';

    return (
        <MainBlockWrapper alignMain="left">
            <div className={s.root}>
                <h1 className={s.headerText}>{action + ' урок'}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Select
                        defaultId={lessonToEdit?.course}
                        labelAlign="left"
                        htmlProps={{ label: 'Track' }}
                        control={control}
                        options={courses.map((t) => ({
                            id: t._id,
                            text: t.title
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
                    <Editor
                        defaultValue={lessonToEdit?.description}
                        labelAlign="left"
                        inputProps={{ label: 'Lesson description' }}
                        rhfProps={{
                            name: 'description',
                            register,
                            setValue
                        }}
                        error={errors.description?.message as string}
                    />
                    <Editor
                        defaultValue={lessonToEdit?.homework}
                        labelAlign="left"
                        inputProps={{ label: 'Lesson homework' }}
                        rhfProps={{
                            name: 'homework',
                            register,
                            setValue
                        }}
                        error={errors.description?.message as string}
                    />
                    <Input
                        labelAlign="left"
                        inputProps={{ label: 'Lesson youtube ID' }}
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
                        <Button type="submit">{action} урок</Button>
                    </div>
                </form>
                {isSuccess && <SuccessAdd />}
            </div>
        </MainBlockWrapper>
    );
};
