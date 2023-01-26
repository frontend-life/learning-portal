import React, { ReactNode } from 'react';
import { Align, AlignItems } from '@type/components';
import { TopRightMenu } from '../TopRightMenu/TopRightMenu';
import { Logo } from './logo';
import s from './MainBlockWrapper.module.css';

type Props = {
    title?: string | ReactNode;
    children: ReactNode;
    alignMain?: Align;
    alignSecond?: AlignItems;
};

function MainBlockWrapper({
    children,
    title,
    alignMain = 'center',
    alignSecond = 'center'
}: Props) {
    return (
        <div className={s.root}>
            <header className={s.header}>
                <Logo />
                <div className={s.text}>{title}</div>
                <TopRightMenu />
            </header>
            <main
                style={{ justifyContent: alignMain, alignItems: alignSecond }}
                className={s.content}
            >
                {children}
            </main>
        </div>
    );
}

export const wrap = (Component: React.FC, title?: string) => {
    return class Wrapper extends React.PureComponent {
        render() {
            return (
                <MainBlockWrapper title={title}>
                    <Component {...this.props} />
                </MainBlockWrapper>
            );
        }
    };
};

export default MainBlockWrapper;
