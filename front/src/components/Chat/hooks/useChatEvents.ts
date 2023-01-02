import { useEffect, useState } from 'react';
import { useUserContext } from '../../../store/UserDetails';
import { getBaseApiUrl } from '../../../utils/axios';
import { MessageCommon } from '@commonTypes';

export const useChatEvents = (
    chat_id: string,
    onUpdate: (message: MessageCommon) => void
) => {
    const [listening, setListening] = useState(false);
    const {
        userDetails: { isSignedIn, _id }
    } = useUserContext();
    useEffect(() => {
        let closeStream = () => {};
        if (!listening && isSignedIn) {
            const eventsStream = new EventSource(
                `${getBaseApiUrl()}/chatevents?chat_id=${chat_id}&user_id=${_id}`
            );

            eventsStream.addEventListener('message', (e) => {
                if (e.data === 'chat events connected') {
                    console.log(e.data);
                    return;
                }

                const parsedData = JSON.parse(e.data);
                /**
                 *  Here will be switcher of events
                 *
                 */
                onUpdate(parsedData as MessageCommon);
            });

            setListening(true);
            // console.log('setListening');

            closeStream = () => eventsStream.close();
        }
        // console.log('useEffect');
        return () => {
            // console.log('return');
            closeStream();
        };
    }, [isSignedIn, chat_id, _id]);
};
