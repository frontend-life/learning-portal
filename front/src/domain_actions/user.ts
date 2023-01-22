import { myRequest } from '@utils/axios';

export const openLessonToUser = (user_id: string, lesson_id: string) =>
    myRequest.post('/user/open', {
        userId: user_id,
        lessonId: lesson_id
    });
