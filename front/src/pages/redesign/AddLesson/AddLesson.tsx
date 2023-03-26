import { IframGoogleDocsViewer } from '@pages/AddLesson/components/DecriptionChecker/DecriptionChecker';
import { useLessonsContext } from '@store/LessonsContext';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Text, Header, PageWrapper, Spacing } from 'src/components_v2';
import s from './AddLesson.module.css';

export const AddLesson = () => {
    const { setLessons, setCourses, courses } = useLessonsContext();

    const addLesson = () => console.log('add lesson');

    const { register, watch, setValue, getValues } = useForm();

    // To select first course in useForm for start
    const courseId = watch('courseId');
    useEffect(() => {
        if (!courseId && courses.length) {
            setValue('courseId', courses[0]._id);
        }
    }, [courseId, courses]);

    console.log(getValues());

    // Iframe logic
    const [check, setCheck] = useState<'iframe' | 'text'>('text');
    const showPreview = () => setCheck('iframe');
    const stopPreview = () => setCheck('text');
    const iframe = watch('iframe');
    useEffect(() => {
        stopPreview();
    }, [iframe]);

    return (
        <PageWrapper>
            <>
                <Header title={'ADD'} subtitle={'LESSON'} />
                <Text size={14}>Course</Text>
                <select {...register('courseId')}>
                    {courses.map((c) => {
                        return (
                            <option value={c._id} key={c._id}>
                                {c.title}
                            </option>
                        );
                    })}
                </select>
                <Spacing />
                <Text size={14}>Title</Text>
                <input {...register('title')} />
                <Spacing />
                <Text size={14}>{'Google Docs <iframe>'}</Text>
                <p>
                    {`It sould looks like
                    <iframe
                        src="https://docs.google.com/document/d/e/2PACX-1vQPv8z...long
line of letters...78kiV/pub?embedded=true"
                    >
                        
                    </iframe>`}
                </p>
                <textarea cols={30} rows={10} {...register('iframe')} />
                <Spacing />

                <Button
                    text="Show preview google doc"
                    mode="secondary"
                    onSubmit={showPreview}
                />
                <Spacing />
                {check === 'text' && (
                    <div className={s.preview}>
                        Iframe to check link to google document. <br></br> Press
                        button above
                    </div>
                )}
                {check === 'iframe' && iframe && (
                    <IframGoogleDocsViewer iframeHtml={iframe} />
                )}
                <Spacing />
                <Button text="Add lesson" loading onSubmit={addLesson} />
            </>
        </PageWrapper>
    );
};
