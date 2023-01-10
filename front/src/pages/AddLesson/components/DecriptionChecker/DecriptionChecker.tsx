import { convertStringToHtml } from '@utils/convert';
import { getLang } from '@utils/langs';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/Button/Button';
import s from './DecriptionChecker.module.css';

function DecriptionChecker({ iframeHtml }: { iframeHtml: string }) {
    const [check, setCheck] = useState(false);

    useEffect(() => {
        setCheck(false);
    }, [iframeHtml]);

    if (!check) {
        return (
            <Button onClick={() => setCheck(true)}>
                {getLang('check_description_iframe')}
            </Button>
        );
    }

    return (
        <>
            <h1>Iframe to check link to google document</h1>
            {check && <IframGoogleDocsViewer iframeHtml={iframeHtml} />}
        </>
    );
}

export function IframGoogleDocsViewer({ iframeHtml }: { iframeHtml: string }) {
    if (!iframeHtml) {
        return null;
    }

    return (
        <div
            className={s.root}
            dangerouslySetInnerHTML={{
                __html: convertStringToHtml(iframeHtml)
            }}
        ></div>
    );
}

export default DecriptionChecker;
