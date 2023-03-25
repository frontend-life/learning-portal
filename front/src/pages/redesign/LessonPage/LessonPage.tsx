import { Text } from 'src/components_v2/Text/Text';
import { PageWrapper } from 'src/components_v2/PageWrapper/PageWrapper';
import s from './LessonPage.module.css';
import { Spacing } from 'src/components_v2/Spacing/Spacing';
import { Button } from 'src/components_v2/Button/Button';
import { useState } from 'react';
import { UserCard } from 'src/components_v2/UserCard/UserCard';
import { CheckTask } from 'src/components_v2/CheckTask/CheckTask';

export const LessonPage = () => {
    const [footer, setFooter] = useState<'check' | 'ask'>('ask');
    return (
        <PageWrapper>
            <>
                <Text size={14}>React: Lesson 1</Text>
                <Spacing />
                <div className={s.googleDocs} />
                <Spacing />
                <div className={s.buttons}>
                    <Button
                        className={s.button}
                        text="Ask help"
                        onSubmit={() => setFooter('ask')}
                        mode="secondary"
                    />
                    <Button
                        className={s.button}
                        text="Code check"
                        onSubmit={() => setFooter('check')}
                    />
                </div>
                <Spacing />
                <div className={s.footer}>
                    {footer === 'check' ? (
                        <>
                            <div className={s.droper}>Drop your file</div>
                            <Spacing />

                            <div className={s.tasks}>
                                <CheckTask status="success" />
                                <CheckTask status="error" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={s.askHelp}>
                                <UserCard />
                                <UserCard />
                                <UserCard />
                                <UserCard />
                            </div>
                        </>
                    )}
                </div>
            </>
        </PageWrapper>
    );
};
