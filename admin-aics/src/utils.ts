export function $(selector: string): HTMLElement {
    const element = document.querySelector(selector) as HTMLElement;
    return element;
}

export function $$(selector: string): NodeListOf<HTMLElement> {
    return document.querySelectorAll(selector);
}
