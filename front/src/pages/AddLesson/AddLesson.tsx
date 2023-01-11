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
import { API_URLS, myRequest } from '../../utils/axios';
import { PATHS } from '../../utils/paths';

import s from './AddLesson.module.css';
import DecriptionChecker from './components/DecriptionChecker/DecriptionChecker';
import { VideoChecker } from './components/VideoChecker/VideoChecker';

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
        formState: { errors },
        watch
    } = useForm({
        defaultValues: lessonToEdit || {}
    });

    const onSubmit = (data: ILesson) => {
        if (lessonToEdit) {
            const editData: Omit<ILesson, '_id'> = {
                title: data.title,
                course: data.course,
                // description: data.description,
                // homework: data.homework,
                iframeGoogleDocs: data.iframeGoogleDocs,
                link: data.link
            };
            myRequest
                .put(
                    `${API_URLS.LESSON}?lessonId=${lessonToEdit._id}`,
                    editData
                )
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

        myRequest.post(API_URLS.LESSON_CREATE, data).then(turnOn);
    };

    useEffect(() => {
        myRequest.get(API_URLS.COURSES).then((tracks) => {
            setCourses(tracks as unknown as ICourse[]);
        });
    }, []);

    const action = lessonToEdit ? 'Изменить' : 'Добавить';
    const link = watch('link');
    const iframeGoogleDocs = watch('iframeGoogleDocs');

    console.log(errors);

    return (
        <MainBlockWrapper alignMain="left" alignSecond="flex-start">
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
                        defaultValue={lessonToEdit?.iframeGoogleDocs}
                        labelAlign="left"
                        inputProps={{
                            label: 'Lesson <iframe> from docs'
                        }}
                        rhfProps={{
                            name: 'iframeGoogleDocs',
                            register,
                            setValue,
                            required: true
                        }}
                        error={errors.iframeGoogleDocs?.type as string}
                        editorClassName={s.editorInput}
                        labelClassName={s.editorLabel}
                        errorClassName={s.errorError}
                        showHowItLooks={false}
                    />
                    <p>It sould looks like</p>
                    <pre>
                        <code>
                            &lt;iframe
                            src="https://docs.google.com/document/d/e/2PACX-1vQPv8z...long
                            <br />
                            line of letters...78kiV/pub?embedded=true"&gt;
                            &lt;/iframe&gt;
                        </code>
                    </pre>

                    {iframeGoogleDocs && (
                        <DecriptionChecker iframeHtml={iframeGoogleDocs} />
                    )}

                    <Input
                        labelAlign="left"
                        inputProps={{ label: 'Lesson youtube ID' }}
                        rhfProps={{
                            ...register('link', {
                                required: false
                            })
                        }}
                        error={errors.link?.message as string}
                    />
                    {link && <VideoChecker link={link} />}
                    <div style={{ marginTop: '40px' }}>
                        <Button type="submit">{action} урок</Button>
                    </div>
                </form>
                {isSuccess && <SuccessAdd />}
            </div>
        </MainBlockWrapper>
    );
};
