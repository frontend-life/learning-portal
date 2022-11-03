function MainBlockWrapper({ children }) {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {children}
        </div>
    );
}

export default MainBlockWrapper;
