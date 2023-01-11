export function convertStringToHtml(str) {
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&#039;/g, "'");
    return str;
}
