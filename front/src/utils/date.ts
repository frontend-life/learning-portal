import format from 'date-fns/format';

// with date 'dd/MM/yyyy H:mm'

export const mongoDateTranform = (
    createdAt?: string,
    pattern: string = 'H:mm'
) => {
    if (!createdAt) {
        return '--:--';
    }
    return format(new Date(createdAt), pattern);
};
