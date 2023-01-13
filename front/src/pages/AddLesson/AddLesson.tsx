import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Editor } from '../../components/Editor/Editor';
import { Input } from '../../components/Input/Input';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { Select, SelectOption } from '../../components/Select/Select';
import { useSuccessAdd } from '../../components/SuccessAdd/SuccessAdd';
import { useLessonsContext } from '../../store/LessonsContext';
import { ICourse, ILesson } from '../../types/api';
import { API_ROUTES, myRequest } from '@utils/axios';
import { PATHS } from '@utils/paths';

import s from './AddLesson.module.css';
import DecriptionChecker from './components/DecriptionChecker/DecriptionChecker';
import { VideoChecker } from './components/VideoChecker/VideoChecker';

export const AddLesson = () => {
    const { state: lessonToEdit }: { state: ILesson } = useLocation();
    const { setLessons, setCourses: setGlobalCourses } = useLessonsContext();
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
                    `${API_ROUTES.LESSON}?lessonId=${lessonToEdit._id}`,
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

        myRequest
            .post<any, ILesson>(API_ROUTES.LESSON_CREATE, data)
            .then((lesson) => {
                setLessons((prev) => {
                    return [...prev, lesson];
                });
                updateGlobalCourses(lesson);
                turnOn();
                navigate(PATHS.lessons);
            });

        function updateGlobalCourses(lesson: ILesson) {
            setGlobalCourses((prev) => {
                return prev.map((course) => {
                    if (course._id === lesson.course) {
                        return {
                            ...course,
                            lessonsOrder: [...course.lessonsOrder, lesson._id]
                        };
                    }
                    return course;
                });
            });
        }
    };

    useEffect(() => {
        if (!lessonToEdit?.course) {
            myRequest.get(API_ROUTES.COURSE).then((tracks) => {
                setCourses(tracks as unknown as ICourse[]);
            });
        }
    }, [lessonToEdit?.course]);

    const action = lessonToEdit ? 'Изменить' : 'Добавить';
    const link = watch('link');
    const iframeGoogleDocs = watch('iframeGoogleDocs');

    const coursesFroSelect: SelectOption[] = useMemo(
        () =>
            courses.map((t) => ({
                id: t._id,
                text: t.title
            })),
        [courses]
    );

    console.log(errors);

    return (
        <MainBlockWrapper alignMain="left" alignSecond="flex-start">
            <div className={s.root}>
                <h1 className={s.headerText}>{action + ' урок'}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {!lessonToEdit?.course ? (
                        <Select
                            defaultId={lessonToEdit?.course}
                            labelAlign="left"
                            htmlProps={{ label: 'Track' }}
                            control={control}
                            options={coursesFroSelect}
                        />
                    ) : (
                        <p style={{ color: 'orange' }}>
                            To change course ask Sergey
                        </p>
                    )}
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
                    {lessonToEdit?.homework && (
                        <Editor
                            defaultValue={lessonToEdit?.description}
                            labelAlign="left"
                            inputProps={{
                                label: 'Lesson description (better to add this info to iframe)'
                            }}
                            rhfProps={{
                                name: 'description',
                                register,
                                setValue
                            }}
                            error={errors.description?.message as string}
                            editorClassName={s.editorInput}
                            labelClassName={s.editorLabel}
                            showHowItLooks={false}
                        />
                    )}
                    {lessonToEdit?.homework && (
                        <Editor
                            defaultValue={lessonToEdit?.homework}
                            labelAlign="left"
                            inputProps={{
                                label: 'Lesson homework (better to add this info to iframe)'
                            }}
                            rhfProps={{
                                name: 'homework',
                                register,
                                setValue
                            }}
                            error={errors.description?.message as string}
                            editorClassName={s.editorInput}
                            labelClassName={s.editorLabel}
                            showHowItLooks={false}
                        />
                    )}
                    <Editor
                        defaultValue={lessonToEdit?.iframeGoogleDocs}
                        labelAlign="left"
                        inputProps={{
                            label: 'Lesson <iframe> from docs'
                        }}
                        rhfProps={{
                            name: 'iframeGoogleDocs',
                            register,
                            setValue
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
