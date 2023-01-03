import { PopulatedHomework } from '@commonTypes';
import { useMemo } from 'react';

type HomeworkItem = {
    id: string;
    user: string;
    lesson: string;
    approved: boolean;
};

export const useHomeworksSearch = (
    data: PopulatedHomework[],
    userSearch: string,
    lessonSearch: string,
    approvedSearch: boolean
): Array<HomeworkItem> => {
    return useMemo(() => {
        if (!data) return [];

        let temp: PopulatedHomework[] = data;

        if (lessonSearch && userSearch) {
            temp = temp.filter(({ lessonId, studentId }) => {
                const lOk = lessonId.title
                    .toLowerCase()
                    .includes(lessonSearch.toLowerCase());
                const sOk = studentId.name
                    .toLowerCase()
                    .includes(userSearch.toLowerCase());
                if (lOk && sOk) {
                    return true;
                }
                return false;
            });
        } else if (lessonSearch) {
            temp = temp.filter(({ lessonId }) => {
                const lOk = lessonId.title
                    .toLowerCase()
                    .includes(lessonSearch.toLowerCase());
                if (lOk) {
                    return true;
                }
                return false;
            });
        } else if (userSearch) {
            temp = temp.filter(({ studentId }) => {
                const sOk = studentId.name
                    .toLowerCase()
                    .includes(userSearch.toLowerCase());
                if (sOk) {
                    return true;
                }
                return false;
            });
        }

        if (approvedSearch) {
            temp = temp.filter((i) => {
                return i.approved;
            });
        } else {
            temp = temp.filter((i) => {
                return !i.approved;
            });
        }

        const result: HomeworkItem[] = temp.map(
            ({ _id, lessonId, studentId, approved }) => {
                return {
                    id: _id,
                    user: studentId.name,
                    lesson: lessonId.title,
                    approved
                };
            }
        );

        return result;
    }, [data, userSearch, lessonSearch, approvedSearch]);
};
