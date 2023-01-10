import { getLang } from '@utils/langs';
import { useState, useEffect } from 'react';
import { Button } from '../../../../components/Button/Button';

export function VideoChecker({ link }: { link: string }) {
    const [check, setCheck] = useState(false);

    useEffect(() => {
        setCheck(false);
    }, [link]);

    if (!check) {
        return (
            <Button onClick={() => setCheck(true)}>
                {getLang('check_video_link')}
            </Button>
        );
    }

    return (
        <>
            <h1>Iframe to check is video ID correct</h1>
            <h3>(if you can play it - it is correct)</h3>
            {link && check && (
                <iframe
                    title="lesson_from_youtube"
                    width="420"
                    height="315"
                    src={'https://www.youtube.com/embed/' + link}
                    frameBorder="0"
                    allowFullScreen
                />
            )}
        </>
    );
}
