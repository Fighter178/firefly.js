declare const defineComponent: (comp: component, options?: componentOptions) => {
    new (): {
        "__#1@#html": string;
        "__#1@#mountListeners": Array<() => void | (() => void)>;
        "__#1@#destroyListeners": Array<() => void>;
        "__#1@#shadow": ShadowRoot;
        "__#1@#state": Array<any>;
        "__#1@#stateCalls": number;
        "__#1@#hasMounted": boolean;
        "__#1@#renderListeners": Array<() => void>;
        "__#1@#beforeRenderListeners": Array<() => void>;
        connectedCallback(): void;
        disconnectedCallback(): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        inert: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element | null;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions | undefined): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions | undefined): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions | undefined): void;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string | null;
        onfullscreenchange: ((this: Element, ev: Event) => any) | null;
        onfullscreenerror: ((this: Element, ev: Event) => any) | null;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string | null;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot | null;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        checkVisibility(options?: CheckVisibilityOptions | undefined): boolean;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2] | null;
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3] | null;
        closest<K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4] | null;
        closest<E extends Element = Element>(selectors: string): E | null;
        getAttribute(qualifiedName: string): string | null;
        getAttributeNS(namespace: string | null, localName: string): string | null;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr | null;
        getAttributeNodeNS(namespace: string | null, localName: string): Attr | null;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
        getElementsByTagName<K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
        getElementsByTagName<K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
        getElementsByTagName<K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        getElementsByTagNameNS(namespace: string | null, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string | null, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element | null;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttribute(qualifiedName: string): void;
        removeAttributeNS(namespace: string | null, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions | undefined): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions | undefined): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions | undefined): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions | undefined): void;
        scrollTo(options?: ScrollToOptions | undefined): void;
        scrollTo(x: number, y: number): void;
        setAttribute(qualifiedName: string, value: string): void;
        setAttributeNS(namespace: string | null, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr | null;
        setAttributeNodeNS(attr: Attr): Attr | null;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean | undefined): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode | null;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode | null;
        readonly nextSibling: ChildNode | null;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string | null;
        readonly parentElement: HTMLElement | null;
        readonly parentNode: ParentNode | null;
        readonly previousSibling: ChildNode | null;
        textContent: string | null;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean | undefined): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node | null): boolean;
        getRootNode(options?: GetRootNodeOptions | undefined): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node | null): T_1;
        isDefaultNamespace(namespace: string | null): boolean;
        isEqualNode(otherNode: Node | null): boolean;
        isSameNode(otherNode: Node | null): boolean;
        lookupNamespaceURI(prefix: string | null): string | null;
        lookupPrefix(namespace: string | null): string | null;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string | null;
        ariaAutoComplete: string | null;
        ariaBusy: string | null;
        ariaChecked: string | null;
        ariaColCount: string | null;
        ariaColIndex: string | null;
        ariaColSpan: string | null;
        ariaCurrent: string | null;
        ariaDisabled: string | null;
        ariaExpanded: string | null;
        ariaHasPopup: string | null;
        ariaHidden: string | null;
        ariaInvalid: string | null;
        ariaKeyShortcuts: string | null;
        ariaLabel: string | null;
        ariaLevel: string | null;
        ariaLive: string | null;
        ariaModal: string | null;
        ariaMultiLine: string | null;
        ariaMultiSelectable: string | null;
        ariaOrientation: string | null;
        ariaPlaceholder: string | null;
        ariaPosInSet: string | null;
        ariaPressed: string | null;
        ariaReadOnly: string | null;
        ariaRequired: string | null;
        ariaRoleDescription: string | null;
        ariaRowCount: string | null;
        ariaRowIndex: string | null;
        ariaRowSpan: string | null;
        ariaSelected: string | null;
        ariaSetSize: string | null;
        ariaSort: string | null;
        ariaValueMax: string | null;
        ariaValueMin: string | null;
        ariaValueNow: string | null;
        ariaValueText: string | null;
        role: string | null;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions | undefined): Animation;
        getAnimations(options?: GetAnimationsOptions | undefined): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        remove(): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element | null;
        readonly previousElementSibling: Element | null;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element | null;
        readonly lastElementChild: Element | null;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9] | null;
        querySelector<K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10] | null;
        querySelector<K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11] | null;
        querySelector<K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12] | null;
        querySelector<E_1 extends Element = Element>(selectors: string): E_1 | null;
        querySelectorAll<K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
        querySelectorAll<K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
        querySelectorAll<K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
        querySelectorAll<K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement | null;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
        onanimationcancel: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
        onanimationend: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
        onanimationiteration: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
        onanimationstart: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
        onauxclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        onbeforeinput: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null;
        onblur: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
        oncancel: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        oncanplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        oncanplaythrough: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        onclose: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        oncontextmenu: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        oncopy: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
        oncuechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        oncut: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
        ondblclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        ondrag: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
        ondragend: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
        ondragenter: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
        ondragleave: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
        ondragover: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
        ondragstart: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
        ondrop: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
        ondurationchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onemptied: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onended: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onerror: OnErrorEventHandler;
        onfocus: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
        onformdata: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null;
        ongotpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        oninput: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        oninvalid: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onkeydown: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
        onkeypress: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
        onkeyup: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
        onload: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onloadeddata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onloadedmetadata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onloadstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onlostpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onmousedown: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        onmouseenter: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        onmouseleave: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        onmousemove: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        onmouseout: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        onmouseover: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        onmouseup: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
        onpaste: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
        onpause: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onplaying: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onpointercancel: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onpointerdown: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onpointerenter: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onpointerleave: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onpointermove: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onpointerout: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onpointerover: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onpointerup: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
        onprogress: ((this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any) | null;
        onratechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onreset: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onresize: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
        onscroll: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onsecuritypolicyviolation: ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null;
        onseeked: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onseeking: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onselect: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onselectionchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onselectstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onslotchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onstalled: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onsubmit: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null;
        onsuspend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        ontimeupdate: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        ontoggle: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        ontouchcancel?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
        ontouchend?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
        ontouchmove?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
        ontouchstart?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
        ontransitioncancel: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
        ontransitionend: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
        ontransitionrun: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
        ontransitionstart: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
        onvolumechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onwaiting: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onwebkitanimationend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onwebkitanimationiteration: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onwebkitanimationstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onwebkittransitionend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
        onwheel: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string | undefined;
        tabIndex: number;
        blur(): void;
        focus(options?: FocusOptions | undefined): void;
    };
};
/** This function is used to allow nesting in the css of a component. This is not a complete solution, and things like :visited require a:visited even if nested. */
export declare const parseNestedCSS: (nestedCSS: string) => string;
export default defineComponent;
export type component = (props: Record<string, string>, funcs: componentFunctions) => string;
export interface componentFunctions {
    /** Rerenders the component. */
    render: () => void;
    /** Lifecycle hook for when the component is added to the DOM. Must be called during component initialization. If anything is returned, it must be a function and will be called when the component is removed from the DOM. */
    onMount: (callback: () => void) => void | Function;
    /** Lifecycle hook for when the component is removed from the DOM. Must be called during component initialization. */
    onUnmount: (callback: () => void) => void;
    /** Lifecycle hook for when the component has rendered. Render should **never** be called within this function. Second argument, if true, prevents this function from being called after mounting. Useful for preventing memory leaks. Default: true */
    onRender: (callback: () => void, notAfterMount?: boolean) => void;
    /** Lifecycle hook which is ran before the component is rendered. */
    beforeRender: (callback: () => void) => void;
    /** Returns the element's shadow root. */
    getShadow: () => ShadowRoot;
    /** React-like useState. Give an initial value, and it returns the value, and a function to set the value, when called, the function rerenders the component unless the second argument is false. */
    useState: <T>(value: T) => [T, (newValue: T, rerender?: boolean) => void];
    /** Returns the component's 'this' context. */
    getSelf: () => HTMLElement;
    /** Creates a property for the component, so that when grabbed with JS (like document.querySelector('component').[property]), the property can be accessed. */
    createProperty: (name: any, value: any) => void;
    /** Fires when an event is triggered on the component. Returns the function to call to remove the listener. */
    on: <T extends keyof DocumentEventMap>(event: T, callback: (e?: DocumentEventMap[T]) => void, options?: EventListenerOptions) => () => void;
    /** Removes an event listener */
    off: <T extends keyof DocumentEventMap>(type: T, callback: (e?: DocumentEventMap[T]) => void, options?: EventListenerOptions) => void;
    /** Dispatches an event from the component. */
    dispatch: (event: Event, to?: Element) => boolean;
    /** Gets an element from the component's shadow root. */
    $: <T extends keyof HTMLElementTagNameMap>(selector: T) => HTMLElementTagNameMap[T] | null;
    /** Gets all elements from the component's shadow root. */
    $$: <T extends keyof HTMLElementTagNameMap>(selector: T) => NodeListOf<HTMLElementTagNameMap[T]> | null;
    /** Allows usage of component extensions. For example, a function to render when props change. Pass each as a separate argument. If any fail, returns false. If not, returns true. If only one extension is passed, then the result of that extension is returned, and can be anything. */
    use: (...extension: ExtensionFunction[]) => any | boolean | useError;
    /** Scopes the CSS for the component. Must be called during component initialization. Parses CSS to allow nesting even on most modern browsers, instead of just the latest version of Chrome. */
    css: (strings: TemplateStringsArray, ...values: any[]) => void;
    /** Enables use of Firefly's magical html. Does not set component HTML. Returns HTML passed into it, after parsing.*/
    html: (strings: TemplateStringsArray, ...values: any[]) => string;
}
interface ExtensionFunctions {
    /** Sets component's html */
    setHTML: (html: string) => void;
    /** Runs a function with the `this` context set to the component. */
    run: (func: Function, args?: any[]) => any;
}
type useError = "FireflyJS: use function called after component has been mounted.";
/** An extension function. Gets passed the component's functions (like onMount, render, etc), and the component itself. Returns a boolean, if true, the extension was executed successfully. */
export type ExtensionFunction = (funcs: componentFunctions, extFuncs: ExtensionFunctions, component: HTMLElement) => any | useError;
interface componentOptions {
    /** The name of the component. Must be defined if using an anonymous function. Overrides the default name. */
    name?: string;
    /** The element's shadow mode. Applies to all components with the same name. */
    shadowMode?: "open" | "closed";
}
/** A builtin Firefly.js extension which renders the component when the attributes change. */
export declare const renderOnAttributeChange: ExtensionFunction;
export declare const expose: (...funcs: Function[]) => ExtensionFunction;
/** A builtin Firefly.js extension which renders the component on the event specified.  */
export declare const renderOn: (event: keyof DocumentEventMap) => ExtensionFunction;
/** A builtin Firefly.js extension which attempts to keep the element from being removed from the DOM with [element].remove. Also prevents the element's children in the shadow root from being removed. Does this recursively, so if there are many child elements, it may be a hit to performance. This also prevent's the removal of the component by using inspect -> delete node. For that to work however, it must have a parent, and it must be the _only_ child. */
export declare const preventRemove: ExtensionFunction;
type StoreSubscriber<T> = (value: T) => void;
/** A store for managing data when needed outside of a component, or when multiple components need to share the same data.
 * @method subscribe Subscribes to changes on the store.
 * @method value The value of the store. When set, notifies all subscribers.
 */
export declare class Store<T> {
    #private;
    constructor(value: T);
    get value(): T;
    set value(value: T);
    /** Subscribe to the store. Returns unsubscribe method.
     * @param subscriber The subscriber
     * @param when When to subscribe, either before or after the change. @default before
     * @returns Function that, when called, unsubscribes the subscriber.
    */
    subscribe(subscriber: StoreSubscriber<T>, when?: "before" | "after"): () => void;
}
