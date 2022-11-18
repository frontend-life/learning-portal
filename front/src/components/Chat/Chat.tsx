import { useRef, useState } from 'react';
import s from './Chat.module.css';

const Text = () => {
    return <div className={s.text} contentEditable />;
};
const Code = () => {
    return <code className={s.code} contentEditable />;
};
const Image = ({ url }: { url: string }) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return (
        <img
            className={s.imgContainer}
            style={{ backgroundImage: `url(${url})` }}
            alt="to help explain homework or question"
        />
    );
};

export const Chat = () => {
    const [elements, setElements] = useState<Array<'t' | 'c'>>([]);
    const [imgs, setImgs] = useState<Array<string>>([]);
    const ref = useRef<HTMLDivElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    console.log(s.code);

    const onSend = () => {
        console.log({
            elements: elements,
            images: imgs
        });
    };

    const addCode = () => {
        setElements((prev) => [...prev, 'c']);
    };
    const addImage = () => {
        imageInputRef.current?.click();
    };
    const addText = () => {
        setElements((prev) => [...prev, 't']);
    };
    const catchImage = (e) => {
        const reader = new FileReader();
        reader.addEventListener('load', (e) => {
            const uploaded_image = reader.result;
            console.log(uploaded_image);
            setImgs((prev) => [...prev, String(uploaded_image)]);
        });
        reader.readAsDataURL(e.target.files[0]);
    };
    return (
        <div ref={ref} className={s.root}>
            <div className={s.buttons}>
                <button onClick={addText}>Add text</button>
                <button onClick={addCode}>Add code</button>
                <button onClick={addImage}>Add image</button>
                <input
                    style={{ display: 'none' }}
                    onChange={catchImage}
                    ref={imageInputRef}
                    type="file"
                    id="image-input"
                    accept="image/jpeg, image/png, image/jpg"
                ></input>
            </div>
            {elements.map((el) => {
                switch (el) {
                    case 't':
                        return <Text />;
                    case 'c':
                        return <Code />;
                    default:
                        return null;
                }
            })}
            <div>
                {imgs.map((i) => {
                    return <Image key={i} url={i} />;
                })}
            </div>
            <button onClick={onSend} className={s.sendButton}>
                Send message
            </button>
        </div>
    );
};
