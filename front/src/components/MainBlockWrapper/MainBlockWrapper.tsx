import React, { ReactNode } from 'react';
import { Align } from '../../types/components';
import { TopRightMenu } from '../TopRightMenu/TopRightMenu';
import { Logo } from './logo';
import s from './MainBlockWrapper.module.css';

type Props = {
    title?: string;
    children: ReactNode;
    alignMain?: Align;
};

function MainBlockWrapper({ children, title, alignMain = 'center' }: Props) {
    return (
        <div className={s.root}>
            <header className={s.header}>
                <Logo />
                <div className={s.text}>{title}</div>
                <TopRightMenu />
            </header>
            <main style={{ justifyContent: alignMain }} className={s.content}>
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
