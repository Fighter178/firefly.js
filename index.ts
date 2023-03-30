import HTMLCompiler from "./compiler";

const defineComponent = (comp:component, options?:componentOptions)=>{
    if (!options?.name && comp.name === "") {
        throw new Error("Firefly.js: Cannot create component without a name. Specify the name by either naming the function or using options.name.");
    };
    // Runs event attributes.
    const runEventAttributes = (elements:Element[], context?:any)=>{
        elements.forEach((elem)=>{
            runEventAttributes(Array.from(elem.children), context)
            const attrs = attributesToObject(elem.attributes);
            for(const name in attrs) {
                const value:(e?:Event)=>void = new Function(`return function(){${attrs[name]}}`)();
                if (!name.includes("on:")) {
                    continue;
                };
                const event = name.split("on:")[1];

                elem.addEventListener(event, (e)=>{
                    if (context) {
                        value.bind(context, e)();
                    } else {
                        value(e);
                    };
                });
            };
        });
    };
    const name = options?.name||'fy-'+comp.name
    class FireflyElement extends HTMLElement {
        #html:string;
        #mountListeners:Array<()=>void|(()=>void)> = [];
        #destroyListeners:Array<()=>void> = [];
        // This is how Firefly ensures the shadow is always passed to the component.
        #shadow:ShadowRoot;

        #state:Array<any> = [];
        #stateCalls:number = 0;
        #hasMounted = false;
        // #hasWatchedProps = false
        // #mutationCallbacks:Array<(props?:Record<string,string>)=>void> = [];
        #renderListeners:Array<()=>void> = [];
        #beforeRenderListeners:Array<()=>void> = []
        constructor(){
            super();
            const component = comp.bind(this);
            const self = this;
            this.#shadow = this.attachShadow({mode:options?.shadowMode||"open"});
            const funcs:componentFunctions = {
                render() {
                    self.#beforeRenderListeners.forEach(listener=>{
                        listener();
                    });
                    self.#stateCalls = 0;
                    const html = component.bind(self)(attributesToObject(self.attributes ?? {}), funcs);
                    self.#shadow.innerHTML = html;
                    self.#html = html;
                    
                    self.#renderListeners.forEach(listener=>{
                        listener();
                    })
                },
                onMount(callback) {
                    if (self.#hasMounted) return;
                    self.#mountListeners.push(callback.bind(self));
                },
                
                onUnmount(callback) {
                    if (self.#hasMounted) return;
                    self.#destroyListeners.push(callback.bind(self));
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
                    if (notAfterMount && self.#hasMounted) {
                        return
                    }
                    self.#renderListeners.push(callback);
                },
                beforeRender(callback) {
                    self.#beforeRenderListeners.push(callback);
                },
                off(type, callback, options) {
                    //@ts-expect-error idk why this also causes error.
                    self.removeEventListener(type, callback, options);
                },
                on(event, callback, options) {
                    //@ts-expect-error I have no idea why this throws a ts error. Fix it if you want.
                    self.addEventListener(event, callback, options);
                    return ()=>{
                        //@ts-ignore idk why again.
                        self.removeEventListener(event, callback, options);
                    }
                },
                dispatch(event, to = document.body) {
                    return to.dispatchEvent(event)
                },
                getShadow() {
                    return self.#shadow;
                },
                useState<T>(initialValue:T) {
                    const state = self.#state;
                    const stateCalls = self.#stateCalls;
                    let value = self.#hasMounted ? state[stateCalls] : initialValue;
                    const setValue = (newValue:T, render = true) =>{
                        value = newValue
                        state[stateCalls] = value
                        if (render) {
                            funcs.render()
                        }
                    }
                    self.#stateCalls++
                    return [value, setValue];
                },
                getSelf() {
                    return self;
                },
                createProperty(name, value) {
                    //@ts-ignore Yes, I know this should be fixed. It works for now though.
                    self[name] = value
                },
                $(selector) {
                    return self.querySelector(selector);
                },
                $$(selector) {
                    return self.querySelectorAll(selector);
                },
                use(...extensions) {
                    const extFuncs:ExtensionFunctions = {
                        run(func, ...args) {
                            func.bind(self, args)(args);
                        },
                        setHTML(html) {
                            self.#shadow.innerHTML = html;
                        },
                    }
                    if (!self.#hasMounted && extensions.length > 1) {
                        extensions.forEach(ext=>{
                            if (!ext(funcs, extFuncs, self)) {
                                return false
                            };
                        });
                        return true;
                    } else {
                        return extensions[0](funcs, extFuncs, self);
                    }
                    // return "FireflyJS: use function called after component has been mounted."
                },
                css(strings, ...values) {
                    if (self.#hasMounted) return;
                    let totalString:string = ""
                    for (let i=0; i<strings.length; i++) {
                        totalString+=strings[i];
                        if (i < values.length) {
                            totalString += values[i];
                        };
                    };
                    const styleElement = document.createElement("style");
                    styleElement.textContent = "/* Compiled CSS by Firefly.js */" + parseNestedCSS(totalString);
                    funcs.onMount(()=>{
                        self.#shadow.append(styleElement);
                    });
                },
                html(strings, ...values) {
                    let html = "";
                    for (let i=0; i<strings.length;i++) {
                        html += strings[i];
                        if (i < values.length) {
                            html += values[i];
                        }
                    }
                    const parsed = new DOMParser().parseFromString(html, "text/html");
                    runEventAttributes(Array.from(parsed.children), self);
                    //html = fixClosingTag(html);
                    const compiler = new HTMLCompiler();
                    html = compiler.compile(html, self);
                    return html
                },
                
            }
            this.#html = component(attributesToObject(this.attributes ?? {}), funcs);
            this.#shadow.innerHTML = this.#html
        };
        connectedCallback(){
            this.#hasMounted = true
            this.#mountListeners.forEach(listener=>{
                const onDestroy = listener();
                if (onDestroy) {
                    this.#destroyListeners.push(onDestroy);
                }
            });
            runEventAttributes(Array.from(this.#shadow.children), this);
        }
        disconnectedCallback(){
            this.#hasMounted = false
            this.#destroyListeners.forEach(listener=>{
                listener();
            });
        }
    };
    customElements.define(name, FireflyElement);
    return FireflyElement;
};
/** This function is used to allow nesting in the css of a component. This is not a complete solution, and things like :visited require a:visited even if nested. */
export const parseNestedCSS = (nestedCSS: string) => {
    let css = '';
    const indentSize = 2;
    let indentLevel = 0;
  
    const lines = nestedCSS.split('\n');
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith(':')) {
        css += ' '.repeat(Math.max(indentLevel, 0)) + trimmedLine + '\n';
      } else if (trimmedLine.startsWith('{')) {
        css += trimmedLine + '\n';
        indentLevel += indentSize;
      } else if (trimmedLine.startsWith('}')) {
        indentLevel -= indentSize;
        css += ' '.repeat(Math.max(indentLevel, 0)) + '}\n';
      } else {
        css += ' '.repeat(Math.max(indentLevel, 0)) + trimmedLine + '\n';
      }
    });
  
    return css;
  };
  
  
const attributesToObject = (attrs:NamedNodeMap) => {
    if (attrs.length <= 0) return {};
    let returnAttrs:Record<string,string> = {};
    for(let i=0; i<attrs.length;i++) {
        const value = attrs.item(i)?.value||""
        const name = attrs.item(i)?.name
        if (!name) {
            throw new Error("Firefly.js : Attribute has no name.")
        }
        returnAttrs[name] = value;
    }
    return returnAttrs;
}
export default defineComponent;
export type component = (props:Record<string,string>, funcs:componentFunctions)=>string
export interface componentFunctions {
    /** Rerenders the component. */
    render:()=>void
    /** Lifecycle hook for when the component is added to the DOM. Must be called during component initialization. If anything is returned, it must be a function and will be called when the component is removed from the DOM. */
    onMount:(callback:()=>void)=>void|Function
    /** Lifecycle hook for when the component is removed from the DOM. Must be called during component initialization. */
    onUnmount:(callback:()=>void)=>void
    // /** Lifecycle hook for when the component's properties change. Provides the new properties. If called after a mutation, will fire on subsequent mutations. Uses MutationObserver. */
    // onPropChange:(callback:(props?:Record<string,string>)=>void)=>void
    /** Lifecycle hook for when the component has rendered. Render should **never** be called within this function. Second argument, if true, prevents this function from being called after mounting. Useful for preventing memory leaks. Default: true */
    onRender:(callback:()=>void, notAfterMount?:boolean)=>void
    /** Lifecycle hook which is ran before the component is rendered. */
    beforeRender:(callback:()=>void)=>void
    /** Returns the element's shadow root. */
    getShadow:()=>ShadowRoot
    /** React-like useState. Give an initial value, and it returns the value, and a function to set the value, when called, the function rerenders the component unless the second argument is false. */
    useState:<T>(value:T)=>[T, (newValue:T, rerender?:boolean)=>void]
    /** Returns the component's 'this' context. */
    getSelf:()=>HTMLElement
    /** Creates a property for the component, so that when grabbed with JS (like document.querySelector('component').[property]), the property can be accessed. */
    createProperty:(name:any,value:any)=>void
    /** Fires when an event is triggered on the component. Returns the function to call to remove the listener. */
    on:<T extends keyof DocumentEventMap>(event:T, callback:(e?:DocumentEventMap[T])=>void, options?:EventListenerOptions)=>()=>void
    /** Removes an event listener */
    off:<T extends keyof DocumentEventMap>(type:T, callback:(e?:DocumentEventMap[T])=>void, options?:EventListenerOptions)=>void
    /** Dispatches an event from the component. */
    dispatch:(event:Event, to?:Element)=>boolean
    /** Gets an element from the component's shadow root. */
    $:<T extends keyof HTMLElementTagNameMap>(selector:T)=>HTMLElementTagNameMap[T] | null
    /** Gets all elements from the component's shadow root. */
    $$:<T extends keyof HTMLElementTagNameMap>(selector:T)=>NodeListOf<HTMLElementTagNameMap[T]> | null
    /** Allows usage of component extensions. For example, a function to render when props change. Pass each as a separate argument. If any fail, returns false. If not, returns true. If only one extension is passed, then the result of that extension is returned, and can be anything. */
    use:(...extension:ExtensionFunction[])=>any|boolean|useError
    /** Scopes the CSS for the component. Must be called during component initialization. Parses CSS to allow nesting even on most modern browsers, instead of just the latest version of Chrome. */
    css:(strings:TemplateStringsArray, ...values:any[])=>void
    /** Enables use of Firefly's magical html. Does not set component HTML. Returns HTML passed into it, after parsing.*/
    html:(strings:TemplateStringsArray, ...values:any[])=>string
};
interface ExtensionFunctions {
    /** Sets component's html */
    setHTML:(html:string)=>void
    /** Runs a function with the `this` context set to the component. */
    run:(func:Function, args?:any[])=>any
}
type useError = "FireflyJS: use function called after component has been mounted."
/** An extension function. Gets passed the component's functions (like onMount, render, etc), and the component itself. Returns a boolean, if true, the extension was executed successfully. */
export type ExtensionFunction = (funcs:componentFunctions, extFuncs:ExtensionFunctions ,component:HTMLElement)=>any|useError;
interface componentOptions {
    /** The name of the component. Must be defined if using an anonymous function. Overrides the default name. */
    name?:string
    /** The element's shadow mode. Applies to all components with the same name. */
    shadowMode?:"open"|"closed"
}
/** A builtin Firefly.js extension which renders the component when the attributes change. */
export const renderOnAttributeChange:ExtensionFunction = ({render}, _, component)=>{
    try {
        const observer = new MutationObserver((mutations)=>{
            mutations.forEach(m=>{
                render();
            });
        });
        observer.observe(component, {
            attributes:true
        });
        return true
    } catch (e) {
        console.error(e);
        return false
    }
}

export const expose = (...funcs:Function[]):ExtensionFunction => {
    return ({createProperty})=>{
        funcs.forEach(func=>{
            createProperty(func.name, func);
        });
    };
};
/** A builtin Firefly.js extension which renders the component on the event specified.  */
export const renderOn = (event:keyof DocumentEventMap):ExtensionFunction=>{
    return ({render, on})=>{
        on(event, render);
        return true
    }
}

/** A builtin Firefly.js extension which attempts to keep the element from being removed from the DOM with [element].remove. Also prevents the element's children in the shadow root from being removed. Does this recursively, so if there are many child elements, it may be a hit to performance. This also prevent's the removal of the component by using inspect -> delete node. For that to work however, it must have a parent, and it must be the _only_ child. */
export const preventRemove:ExtensionFunction = ({getShadow, getSelf, useState, onUnmount}, _, comp)=>{
    comp.remove = ()=>{
        throw new Error("Cannot remove element.");
    }
    const lockChildren = (elem:Element) => {
        if (!elem.hasChildNodes()) return
        Array.from(elem.children).forEach(child=>{
            child.remove = ()=>{
                throw new Error("Cannot remove element.");
            }
            lockChildren(child);
        });
    };
    Array.from(getShadow().children).forEach(child=>{
        child.remove = ()=>{
            throw new Error("Cannot remove element.");
        }
        lockChildren(child);
    });
    lockChildren(comp);

    const [self] = useState(getSelf());
    const [parent] = useState(self.parentNode||document.body);
    const [children] = useState(Array.from(self.children));
    onUnmount(()=>{
        parent.append(self);
        children.forEach(child=>{
            const parentElement = child.parentElement||document.body
            parentElement.append(child);
        });
    });
    return true
}
type StoreSubscriber<T> = (value:T)=>void
/** A store for managing data when needed outside of a component, or when multiple components need to share the same data.
 * @method subscribe Subscribes to changes on the store. 
 * @method value The value of the store. When set, notifies all subscribers.
 */
export class Store<T> {
    #value:T
    #onBeforeSubscribers:StoreSubscriber<T>[] = [];
    #onAfterSubscribers:StoreSubscriber<T>[] = [];
    constructor(value:T){
        this.#value = value
    }
    get value(){
        return this.#value
    }
    set value(value:T) {
        this.#onBeforeSubscribers.forEach(sub=>{
            sub(this.#value);
        });
        this.#value = value
        this.#onAfterSubscribers.forEach(sub=>{
            sub(value);
        });
    };
    /** Subscribe to the store. Returns unsubscribe method. 
     * @param subscriber The subscriber
     * @param when When to subscribe, either before or after the change. @default before
     * @returns Function that, when called, unsubscribes the subscriber.
    */
    subscribe(subscriber:StoreSubscriber<T>, when:"before"|"after" = "before"):()=>void{
        if (when === "before") {
            this.#onBeforeSubscribers.push(subscriber);
            return ()=>{
                this.#onBeforeSubscribers.filter((value)=>value!==subscriber);
            }
        }
        this.#onAfterSubscribers.push(subscriber)
        return ()=>{
            this.#onAfterSubscribers.filter((value)=>value!==subscriber);
        }; 
    };
};

// Builtin components 

const ifComponent:component = ({exp}, {use})=>{
    const evaluated = new Function(`return ${exp ? true : false}`)();
    use(renderOnAttributeChange);
    return /* html */`
        ${evaluated ? '<slot></slot>' : ""}
    `;
}
defineComponent(ifComponent, {name:"fy-if"});
const elseComponent:component = (_, {getSelf})=>{
    const self = getSelf();
    if (self.previousElementSibling?.tagName.toLocaleLowerCase() !== "fy-if") {
        console.error("Firefly.js: <fy-else> component's previous sibling is not an instance of a Firefly <fy-if> component. Previous Sibling: ", self.previousElementSibling)
        return ``;
    } else {
        const prevSib = self.previousElementSibling;
        if (prevSib === null) {
            console.error("Firefly.js: <fy-else> component doesn't have a previous sibling. Must have a previous sibling.")
            return '';
        }
        const exp = prevSib.getAttribute("exp");
        const evaluated = !new Function(`return  ${exp}`)();
        return /* html */`${evaluated ? "<slot></slot>":""}`
    }
}
defineComponent(elseComponent, {
    name:"fy-else"
});

// Magic HTML





const fixClosingTag = (html: string): string => {
    // regex to match self-closing tags
    const regex = /<([^>\/\s]+)\s*(?:"[^"]*"|'[^']*'|\S)*?\/>/g;
  
    // stack to keep track of open tags
    const stack: string[] = [];
  
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
  
  