import { HomeworkCommon } from './../../../../../../shared/commonParts';
import { PopulatedHomework } from '@commonTypes';
import { useMemo } from 'react';

type ReturnData = (HomeworkCommon | undefined)[];

export const useHomeworksSearch = (
    data: PopulatedHomework[],
    userSearch: string,
    lessonSearch: string,
    approvedSearch: boolean
): PopulatedHomework[] => {
    return useMemo(() => {
        if (!data) return [];

        let temp: PopulatedHomework[] = data;

        if (lessonSearch && userSearch) {
            temp = temp.filter(({ lessonId, studentId }) => {
                const lOk = (lessonId?.title || '')
                    .toLowerCase()
                    .includes(lessonSearch.toLowerCase());
                const sOk = (studentId.name || '')
                    .toLowerCase()
                    .includes(userSearch.toLowerCase());
                if (lOk && sOk) {
                    return true;
                }
                return false;
            });
        } else if (lessonSearch) {
            temp = temp.filter(({ lessonId }) => {
                const lOk = (lessonId.title || '')
                    .toLowerCase()
                    .includes(lessonSearch.toLowerCase());
                if (lOk) {
                    return true;
                }
                return false;
            });
        } else if (userSearch) {
            temp = temp.filter(({ studentId }) => {
                const sOk = (studentId.name || '')
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

        const result: PopulatedHomework[] = temp;

        return result;
    }, [data, userSearch, lessonSearch, approvedSearch]);
};
