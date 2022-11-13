import s from './Select.module.css';

type Option = {
    id: any;
    text: string;
};

type Props = {
    options: Option[];
    // onChange: (o: Option) => void;
    rhfProps: any;
    htmlProps?: React.HTMLProps<HTMLSelectElement>;
    labelAlign?: 'left' | 'right' | 'center';
};

export const Select = (props: Props) => {
    const { options, htmlProps, rhfProps, labelAlign = 'center' } = props;
    const noOptions = options.length === 0;
    const getLabel = () => {
        if (htmlProps?.label) {
            return (
                <p style={{ textAlign: labelAlign }} className={s.label}>
                    {htmlProps.label}
                </p>
            );
        }
        return null;
    };
    return (
        <div className={s.wrapper}>
            {getLabel()}
            <select
                className={`${s.root} ${noOptions && s.rootNoClick}`}
                {...rhfProps}
            >
                {noOptions && (
                    <option key="no options" selected disabled>
                        No options
                    </option>
                )}
                {!noOptions &&
                    options.map((o) => {
                        return <option key={o.id}>{o.text}</option>;
                    })}
            </select>
        </div>
    );
};
