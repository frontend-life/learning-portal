export const tab = (e: React.KeyboardEvent<any>) => {
    const selection = document.getSelection() as Selection;
    const range = selection.getRangeAt(0);
    const tabNode = document.createTextNode('\u00a0\u00a0\u00a0\u00a0');
    range.insertNode(tabNode);
    range.setStartAfter(tabNode);
    range.setEndAfter(tabNode);
    selection.removeAllRanges();
    selection.addRange(range);
};
