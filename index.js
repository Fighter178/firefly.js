"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Store_value, _Store_onBeforeSubscribers, _Store_onAfterSubscribers;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = exports.preventRemove = exports.renderOn = exports.expose = exports.renderOnAttributeChange = exports.parseNestedCSS = void 0;
const compiler_1 = __importDefault(require("./compiler"));
const defineComponent = (comp, options) => {
    var _FireflyElement_html, _FireflyElement_mountListeners, _FireflyElement_destroyListeners, _FireflyElement_shadow, _FireflyElement_state, _FireflyElement_stateCalls, _FireflyElement_hasMounted, _FireflyElement_renderListeners, _FireflyElement_beforeRenderListeners;
    if (!options?.name && comp.name === "") {
        throw new Error("Firefly.js: Cannot create component without a name. Specify the name by either naming the function or using options.name.");
    }
    ;
    // Runs event attributes.
    const runEventAttributes = (elements, context) => {
        elements.forEach((elem) => {
            runEventAttributes(Array.from(elem.children), context);
            const attrs = attributesToObject(elem.attributes);
            for (const name in attrs) {
                const value = new Function(`return function(){${attrs[name]}}`)();
                if (!name.includes("on:")) {
                    continue;
                }
                ;
                const event = name.split("on:")[1];
                elem.addEventListener(event, (e) => {
                    if (context) {
                        value.bind(context, e)();
                    }
                    else {
                        value(e);
                    }
                    ;
                });
            }
            ;
        });
    };
    const name = options?.name || 'fy-' + comp.name;
    class FireflyElement extends HTMLElement {
        constructor() {
            super();
            _FireflyElement_html.set(this, void 0);
            _FireflyElement_mountListeners.set(this, []);
            _FireflyElement_destroyListeners.set(this, []);
            // This is how Firefly ensures the shadow is always passed to the component.
            _FireflyElement_shadow.set(this, void 0);
            _FireflyElement_state.set(this, []);
            _FireflyElement_stateCalls.set(this, 0);
            _FireflyElement_hasMounted.set(this, false);
            // #hasWatchedProps = false
            // #mutationCallbacks:Array<(props?:Record<string,string>)=>void> = [];
            _FireflyElement_renderListeners.set(this, []);
            _FireflyElement_beforeRenderListeners.set(this, []);
            const component = comp.bind(this);
            const self = this;
            __classPrivateFieldSet(this, _FireflyElement_shadow, this.attachShadow({ mode: options?.shadowMode || "open" }), "f");
            const funcs = {
                render() {
                    __classPrivateFieldGet(self, _FireflyElement_beforeRenderListeners, "f").forEach(listener => {
                        listener();
                    });
                    __classPrivateFieldSet(self, _FireflyElement_stateCalls, 0, "f");
                    const html = component.bind(self)(attributesToObject(self.attributes ?? {}), funcs);
                    __classPrivateFieldGet(self, _FireflyElement_shadow, "f").innerHTML = html;
                    __classPrivateFieldSet(self, _FireflyElement_html, html, "f");
                    __classPrivateFieldGet(self, _FireflyElement_renderListeners, "f").forEach(listener => {
                        listener();
                    });
                },
                onMount(callback) {
                    if (__classPrivateFieldGet(self, _FireflyElement_hasMounted, "f"))
                        return;
                    __classPrivateFieldGet(self, _FireflyElement_mountListeners, "f").push(callback.bind(self));
                },
                onUnmount(callback) {
                    if (__classPrivateFieldGet(self, _FireflyElement_hasMounted, "f"))
                        return;
                    __classPrivateFieldGet(self, _FireflyElement_destroyListeners, "f").push(callback.bind(self));
                },
                // onPropChange(callback) {
                //     if (!self.#hasWatchedProps) {
                //         const observer = new MutationObserver((mutations)=>{
                //             mutations.forEach(mutation=>{
                //                 const props = attributesToObject(self.attributes)
                //                 self.#mutationCallbacks.forEach(callback=>{
                //                     callback(props);
                //                 })
                //             });
                //         });
                //         observer.observe(self, {
                //             attributes:true
                //         });
                //         self.#hasWatchedProps = true
                //         return
                //     } 
                //     self.#mutationCallbacks.push(callback);
                // },
                onRender(callback, notAfterMount = true) {
                    if (notAfterMount && __classPrivateFieldGet(self, _FireflyElement_hasMounted, "f")) {
                        return;
                    }
                    __classPrivateFieldGet(self, _FireflyElement_renderListeners, "f").push(callback);
                },
                beforeRender(callback) {
                    __classPrivateFieldGet(self, _FireflyElement_beforeRenderListeners, "f").push(callback);
                },
                off(type, callback, options) {
                    //@ts-expect-error idk why this also causes error.
                    self.removeEventListener(type, callback, options);
                },
                on(event, callback, options) {
                    //@ts-expect-error I have no idea why this throws a ts error. Fix it if you want.
                    self.addEventListener(event, callback, options);
                    return () => {
                        //@ts-ignore idk why again.
                        self.removeEventListener(event, callback, options);
                    };
                },
                dispatch(event, to = document.body) {
                    return to.dispatchEvent(event);
                },
                getShadow() {
                    return __classPrivateFieldGet(self, _FireflyElement_shadow, "f");
                },
                useState(initialValue) {
                    var _a, _b;
                    const state = __classPrivateFieldGet(self, _FireflyElement_state, "f");
                    const stateCalls = __classPrivateFieldGet(self, _FireflyElement_stateCalls, "f");
                    let value = __classPrivateFieldGet(self, _FireflyElement_hasMounted, "f") ? state[stateCalls] : initialValue;
                    const setValue = (newValue, render = true) => {
                        value = newValue;
                        state[stateCalls] = value;
                        if (render) {
                            funcs.render();
                        }
                    };
                    __classPrivateFieldSet(_a = self, _FireflyElement_stateCalls, (_b = __classPrivateFieldGet(_a, _FireflyElement_stateCalls, "f"), _b++, _b), "f");
                    return [value, setValue];
                },
                getSelf() {
                    return self;
                },
                createProperty(name, value) {
                    //@ts-ignore Yes, I know this should be fixed. It works for now though.
                    self[name] = value;
                },
                $(selector) {
                    return self.querySelector(selector);
                },
                $$(selector) {
                    return self.querySelectorAll(selector);
                },
                use(...extensions) {
                    const extFuncs = {
                        run(func, ...args) {
                            func.bind(self, args)(args);
                        },
                        setHTML(html) {
                            __classPrivateFieldGet(self, _FireflyElement_shadow, "f").innerHTML = html;
                        },
                    };
                    if (!__classPrivateFieldGet(self, _FireflyElement_hasMounted, "f") && extensions.length > 1) {
                        extensions.forEach(ext => {
                            if (!ext(funcs, extFuncs, self)) {
                                return false;
                            }
                            ;
                        });
                        return true;
                    }
                    else {
                        return extensions[0](funcs, extFuncs, self);
                    }
                    // return "FireflyJS: use function called after component has been mounted."
                },
                css(strings, ...values) {
                    if (__classPrivateFieldGet(self, _FireflyElement_hasMounted, "f"))
                        return;
                    let totalString = "";
                    for (let i = 0; i < strings.length; i++) {
                        totalString += strings[i];
                        if (i < values.length) {
                            totalString += values[i];
                        }
                        ;
                    }
                    ;
                    const styleElement = document.createElement("style");
                    styleElement.textContent = (0, exports.parseNestedCSS)(totalString);
                    funcs.onMount(() => {
                        __classPrivateFieldGet(self, _FireflyElement_shadow, "f").append(styleElement);
                    });
                },
                html(strings, ...values) {
                    let html = "";
                    for (let i = 0; i < strings.length; i++) {
                        html += strings[i];
                        if (i < values.length) {
                            html += values[i];
                        }
                    }
                    const parsed = new DOMParser().parseFromString(html, "text/html");
                    runEventAttributes(Array.from(parsed.children), self);
                    //html = fixClosingTag(html);
                    const compiler = new compiler_1.default();
                    html = compiler.compile(html, self);
                    return html;
                },
            };
            __classPrivateFieldSet(this, _FireflyElement_html, component(attributesToObject(this.attributes ?? {}), funcs), "f");
            __classPrivateFieldGet(this, _FireflyElement_shadow, "f").innerHTML = __classPrivateFieldGet(this, _FireflyElement_html, "f");
        }
        ;
        connectedCallback() {
            __classPrivateFieldSet(this, _FireflyElement_hasMounted, true, "f");
            __classPrivateFieldGet(this, _FireflyElement_mountListeners, "f").forEach(listener => {
                const onDestroy = listener();
                if (onDestroy) {
                    __classPrivateFieldGet(this, _FireflyElement_destroyListeners, "f").push(onDestroy);
                }
            });
            runEventAttributes(Array.from(__classPrivateFieldGet(this, _FireflyElement_shadow, "f").children), this);
        }
        disconnectedCallback() {
            __classPrivateFieldSet(this, _FireflyElement_hasMounted, false, "f");
            __classPrivateFieldGet(this, _FireflyElement_destroyListeners, "f").forEach(listener => {
                listener();
            });
        }
    }
    _FireflyElement_html = new WeakMap(), _FireflyElement_mountListeners = new WeakMap(), _FireflyElement_destroyListeners = new WeakMap(), _FireflyElement_shadow = new WeakMap(), _FireflyElement_state = new WeakMap(), _FireflyElement_stateCalls = new WeakMap(), _FireflyElement_hasMounted = new WeakMap(), _FireflyElement_renderListeners = new WeakMap(), _FireflyElement_beforeRenderListeners = new WeakMap();
    ;
    customElements.define(name, FireflyElement);
    return FireflyElement;
};
/** This function is used to allow nesting in the css of a component. This is not a complete solution, and things like :visited require a:visited even if nested. */
const parseNestedCSS = (nestedCSS) => {
    let css = '';
    const indentSize = 2;
    let indentLevel = 0;
    const lines = nestedCSS.split('\n');
    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith(':')) {
            css += ' '.repeat(Math.max(indentLevel, 0)) + trimmedLine + '\n';
        }
        else if (trimmedLine.startsWith('{')) {
            css += trimmedLine + '\n';
            indentLevel += indentSize;
        }
        else if (trimmedLine.startsWith('}')) {
            indentLevel -= indentSize;
            css += ' '.repeat(Math.max(indentLevel, 0)) + '}\n';
        }
        else {
            css += ' '.repeat(Math.max(indentLevel, 0)) + trimmedLine + '\n';
        }
    });
    return css;
};
exports.parseNestedCSS = parseNestedCSS;
const attributesToObject = (attrs) => {
    if (attrs.length <= 0)
        return {};
    let returnAttrs = {};
    for (let i = 0; i < attrs.length; i++) {
        const value = attrs.item(i)?.value || "";
        const name = attrs.item(i)?.name;
        if (!name) {
            throw new Error("Firefly.js : Attribute has no name.");
        }
        returnAttrs[name] = value;
    }
    return returnAttrs;
};
exports.default = defineComponent;
;
/** A builtin Firefly.js extension which renders the component when the attributes change. */
const renderOnAttributeChange = ({ render }, _, component) => {
    try {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(m => {
                render();
            });
        });
        observer.observe(component, {
            attributes: true
        });
        return true;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
exports.renderOnAttributeChange = renderOnAttributeChange;
const expose = (...funcs) => {
    return ({ createProperty }) => {
        funcs.forEach(func => {
            createProperty(func.name, func);
        });
    };
};
exports.expose = expose;
/** A builtin Firefly.js extension which renders the component on the event specified.  */
const renderOn = (event) => {
    return ({ render, on }) => {
        on(event, render);
        return true;
    };
};
exports.renderOn = renderOn;
/** A builtin Firefly.js extension which attempts to keep the element from being removed from the DOM with [element].remove. Also prevents the element's children in the shadow root from being removed. Does this recursively, so if there are many child elements, it may be a hit to performance. This also prevent's the removal of the component by using inspect -> delete node. For that to work however, it must have a parent, and it must be the _only_ child. */
const preventRemove = ({ getShadow, getSelf, useState, onUnmount }, _, comp) => {
    comp.remove = () => {
        throw new Error("Cannot remove element.");
    };
    const lockChildren = (elem) => {
        if (!elem.hasChildNodes())
            return;
        Array.from(elem.children).forEach(child => {
            child.remove = () => {
                throw new Error("Cannot remove element.");
            };
            lockChildren(child);
        });
    };
    Array.from(getShadow().children).forEach(child => {
        child.remove = () => {
            throw new Error("Cannot remove element.");
        };
        lockChildren(child);
    });
    lockChildren(comp);
    const [self] = useState(getSelf());
    const [parent] = useState(self.parentNode || document.body);
    const [children] = useState(Array.from(self.children));
    onUnmount(() => {
        parent.append(self);
        children.forEach(child => {
            const parentElement = child.parentElement || document.body;
            parentElement.append(child);
        });
    });
    return true;
};
exports.preventRemove = preventRemove;
/** A store for managing data when needed outside of a component, or when multiple components need to share the same data.
 * @method subscribe Subscribes to changes on the store.
 * @method value The value of the store. When set, notifies all subscribers.
 */
class Store {
    constructor(value) {
        _Store_value.set(this, void 0);
        _Store_onBeforeSubscribers.set(this, []);
        _Store_onAfterSubscribers.set(this, []);
        __classPrivateFieldSet(this, _Store_value, value, "f");
    }
    get value() {
        return __classPrivateFieldGet(this, _Store_value, "f");
    }
    set value(value) {
        __classPrivateFieldGet(this, _Store_onBeforeSubscribers, "f").forEach(sub => {
            sub(__classPrivateFieldGet(this, _Store_value, "f"));
        });
        __classPrivateFieldSet(this, _Store_value, value, "f");
        __classPrivateFieldGet(this, _Store_onAfterSubscribers, "f").forEach(sub => {
            sub(value);
        });
    }
    ;
    /** Subscribe to the store. Returns unsubscribe method.
     * @param subscriber The subscriber
     * @param when When to subscribe, either before or after the change. @default before
     * @returns Function that, when called, unsubscribes the subscriber.
    */
    subscribe(subscriber, when = "before") {
        if (when === "before") {
            __classPrivateFieldGet(this, _Store_onBeforeSubscribers, "f").push(subscriber);
            return () => {
                __classPrivateFieldGet(this, _Store_onBeforeSubscribers, "f").filter((value) => value !== subscriber);
            };
        }
        __classPrivateFieldGet(this, _Store_onAfterSubscribers, "f").push(subscriber);
        return () => {
            __classPrivateFieldGet(this, _Store_onAfterSubscribers, "f").filter((value) => value !== subscriber);
        };
    }
    ;
}
exports.Store = Store;
_Store_value = new WeakMap(), _Store_onBeforeSubscribers = new WeakMap(), _Store_onAfterSubscribers = new WeakMap();
;
// Builtin components 
const ifComponent = ({ exp }, { use }) => {
    const evaluated = new Function(`return ${exp ? true : false}`)();
    use(exports.renderOnAttributeChange);
    return /* html */ `
        ${evaluated ? '<slot></slot>' : ""}
    `;
};
defineComponent(ifComponent, { name: "fy-if" });
const elseComponent = (_, { getSelf }) => {
    const self = getSelf();
    if (self.previousElementSibling?.tagName.toLocaleLowerCase() !== "fy-if") {
        console.error("Firefly.js: <fy-else> component's previous sibling is not an instance of a Firefly <fy-if> component. Previous Sibling: ", self.previousElementSibling);
        return ``;
    }
    else {
        const prevSib = self.previousElementSibling;
        if (prevSib === null) {
            console.error("Firefly.js: <fy-else> component doesn't have a previous sibling. Must have a previous sibling.");
            return '';
        }
        const exp = prevSib.getAttribute("exp");
        const evaluated = !new Function(`return  ${exp}`)();
        return /* html */ `${evaluated ? "<slot></slot>" : ""}`;
    }
};
defineComponent(elseComponent, {
    name: "fy-else"
});
// Magic HTML
const fixClosingTag = (html) => {
    // regex to match self-closing tags
    const regex = /<([^>\/\s]+)\s*(?:"[^"]*"|'[^']*'|\S)*?\/>/g;
    // stack to keep track of open tags
    const stack = [];
    // loop through all matches and fill the stack with open tag names
    let result = html.replace(regex, (match, tagName) => {
        // add the tag name to the stack
        stack.push(tagName.toLowerCase());
        // construct the opening tag
        const openingTag = `<${tagName}>`;
        // return the opening tag for the self-closing tag
        return openingTag;
    });
    // loop through all remaining open tags and add the corresponding closing tags
    while (stack.length > 0) {
        const tagName = stack.pop();
        // add the closing tag for the open tag
        result += `</${tagName}>`;
    }
    return result;
};
