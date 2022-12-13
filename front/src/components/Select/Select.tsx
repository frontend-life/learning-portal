import { Align } from '../../types/components';
import { Control, Controller } from 'react-hook-form';
import s from './Select.module.css';
import { useEffect } from 'react';

type Option = {
    id: string;
    text: string;
};

type Props = {
    defaultId?: string;
    options: Option[];
    htmlProps?: React.HTMLProps<HTMLSelectElement>;
    labelAlign?: Align;
    control: Control<any>;
};

export const Select = (props: Props) => {
    const {
        defaultId,
        options,
        htmlProps,
        control,
        labelAlign = 'center'
    } = props;
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
        <Controller
            name="course"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => {
                return (
                    <div className={s.wrapper}>
                        <SelectInside
                            defaultId={defaultId}
                            getLabel={getLabel}
                            onChange={onChange}
                            options={options}
                            value={value}
                        />
                    </div>
                );
            }}
        />
    );
};

function SelectInside({ defaultId, getLabel, onChange, options, value }) {
    const noOptions = options.length === 0;

    useEffect(() => {
        if (defaultId) {
            onChange(defaultId);
        } else {
            onChange(noOptions ? 'No options' : options[0!].id);
        }
    }, [defaultId, noOptions, onChange, options]);

    return (
        <>
            {getLabel()}
            <select
                className={`${s.root} ${noOptions && s.rootNoClick}`}
                onChange={(e) => {
                    const id = options.find(
                        (o) => o.text === e.target.value
                    )?.id;
                    onChange(id);
                }}
                value={
                    noOptions
                        ? 'No options'
                        : options.find((o) => o.id === value)?.text
                }
            >
                {noOptions && (
                    <option key="no options" disabled>
                        No options
                    </option>
                )}
                {!noOptions &&
                    options.map((o) => {
                        return <option key={o.id}>{o.text}</option>;
                    })}
            </select>
        </>
    );
}
