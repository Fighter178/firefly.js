# Firefly.js

A library to massively simplify Web Components.



## Docs

### `defineComponent` Function

The `defineComponent` function is the main function in Firefly.js. 

It is where you create your components.



Note: **All** components have a shadow root. By default, it is **open**, and all components, under the hood, extend `HTMLElement`.



This function takes two arguments, the component's function, and optional options, here is that typescript interface: 

```ts

interface componentOptions {

    name?:string

    shadowMode?:"open"|"closed"

}

```

If the component function has a name, the name of the component will be: fy-[function name]. Otherwise, use the options.name parameter.



The component function is given two things, props (the attributes for the component), and a bunch of helper functions. The component function **must** return the HTML to render, as a string.

These are all the helper functions: 

```ts

    interface componentFunctions {

        /** Rerenders the component. */

        render:()=>void

        /** Lifecycle hook for when the component is added to the DOM. Must be called during component initialization. If anything is returned, it must be a function and will be called when the component is removed from the DOM. */

        onMount:(callback:()=>void)=>void|Function

        /** Lifecycle hook for when the component is removed from the DOM. Must be called during component initialization. */

        onUnmount:(callback:()=>void)=>void

        /** Lifecycle hook for when the component has rendered. Render should **never** be called within this function. Second argument, if true, prevents this function from being called after mounting. Useful for preventing memory leaks. Default: true */

        onRender:(callback:()=>void, notAfterMount?:boolean)=>void

        /** Lifecycle hook which is ran before the component is rendered. */

        beforeRender:(callback:()=>void)=>void

        /** Returns the element's shadow root. */

        getShadow:()=>ShadowRoot

        /** React-like useState. Give an initial value, and it returns the value, and a function to set the value, when called, the function rerenders the component unless the second argument is false. */

        useState:<T>(value:T)=>[T, (newValue:T, rerender?:boolean)=>void]

        /** Returns the component's 'this' context. */

        getSelf:()=>ThisType<component>

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

        /** Allows usage of component extensions. For example, a function to render when props change. Pass each as a separate argument. If any fail, returns false. If not, returns true. */

        use:(...extension:ExtensionFunction[])=>boolean|useError

    };

    type useError = "FireflyJS: use function called after component has been mounted."

    export type ExtensionFunction = (funcs:componentFunctions, component:HTMLElement)=>boolean

```

### Lifecycle Hooks

- `onMount` : Runs code when the component is added to the DOM

- `onUnmount` : Runs code when the component is removed from the DOM.

- `onRender` : Runs code *after* the component has rendered.

- `beforeRender` : Runs code *before* the component has rendered.

### State

- `useState` : React-like implementation. Returns an array with the value, and a function that sets the value, and if the second argument of that function is true (it is by default), also renders the component.

### Misc

- `render` : Rerenders the component.

- `$` : Returns the first element from the component's shadow root matching the selector.

- `$$` : Returns all of the elements from the component's shadow root matching the selector

- `on` : Listen for events. Alias of `component.addEventListener(event, callback, options)`, however this one returns a function to remove the listener

- `off` : Alias of `component.removeEventListener(type, callback, options)`.

- `dispatch` : Dispatches an event to the target.

- `css` : Defines CSS for the component. 

- `html` : Allows use of Firefly's magical HTML (mHTML).



### Firefly's Magical HTML (mHTML)

Firefly has a compiler, which can compile a string of mHTML to normal HTML.

This compiler adds many great features. 

To use it, use the `html` function passed to the component.

Like so, 

```ts

import defineComponent from "firefly.js"

defineComponent((_,{html})=>{

    return html`

        This is mHTML.

    `

})

```

Or, you can use it like so: 

```ts

import mHTMLCompiler from "firefly.js/compiler";

const compiler = new mHTMLCompiler();

const compiled = compiler.compile(`

    <if c="true">

       This is compiled mHTML!

    </if>

    <if c="false">

        This isn't even rendered!

    </if>

`);



```

#### mHTML elements

mHTML provides multiple elements.

These are:

- `<btn>` A shorter `<button>` element. Turns into a button element.

- `<vid>` A shorter `video` element. Turns into a video element.

- `<group>` (in development) A group is a group of elements. Will eventually have nice methods for handling the children. Turns into a div with the class "fy-group"

- `<if>` Conditionally renders HTML based off of the `c` (for condition) attribute. 

  - `<else>` A child of `<if>`, if the if block failed, this will be rendered. Optional, and not all `<if>` elements will need an `<else>` element.

- `<each>` Loop through an array from the `of` attribute. See example below.

- `<tooltip>` Shows a tooltip. Does not provide CSS. Use your own. This gives a div with class of "fy-tooltip" for the tooltip, "fy-tooltip-pos" for the position (passed as `pos` attribute to tooltip), and a span with class "fy-tooltip-text".

##### Examples

```html

<group>

    <btn>This is a button!</btn>

    <!-- If example -->

    <if c="1+1==2">

        <h3>1+1=2!</h3>

        <else>

            <h3>Nope, 1+1 is not 2!</h3>

            <p>Something has gone terribly wrong... </p>

        </else>

    </if>

    The numbers 1-5 are:

    <!-- The index attribute is not required. -->

    <each of='[1,2,3,4,5]' as='num' index='i'>

        <p class="num-{i}">{num}</p>

    </each>

</group>

```

And once compiled gives:

(I neatened it up a bit)

```html

<div>

    <button>This is a button!</button>

    <div>

        <h3>1+1=2!</h3>

    </div>

    The numbers 1-5 are:

    <div>

        <p class="num-0">1</p>

        <p class="num-1">2</p>

        <p class="num-2">3</p>

        <p class="num-3">4</p>

        <p class="num-4">5</p>

    </div>

</div>

```

Cool, eh?

### Extensions and `use` function

Firefly.js has an extension system. Components can use the `use` function passed to them to use component extensions. This can be useful for sharing code between components.

Firefly.js has a few builtin extensions, namely `renderOnAttributeChange`, `renderOn`, `preventRemove`, and `expose`.

The first one is self-explanatory. The second one is a function that must be called, and returns an extension function. Pass in an event, and it renders the component when that event has been triggered on the component. `expose` exposes a firefly function, such as `render` so that calling `document.querySelector('my-component').[func]()` works. The `preventRemove` extension prevents the component (and all children, recursively) from being removed with `.remove()`. You can pass any number of arguments into the `use` function, and they will each be executed one after the other. The `use` function must be called during component initialization, otherwise, it does nothing. Unless, the `use` function is passed exactly one argument, then it executes all the time, and the result of that extension is returned.

### Builtin Components (DEPRECATED)

These are deprecated. Use the `html` function instead. That compiles the elements.

Firefly.js has just a few builtin components, these are: 

- `fy-if` Renders content based on 'exp' attribute.

- `fy-else` Renders content based on if the previous sibling is a `fy-if` component, and two, if that components `exp` attribute is false.

- and soon more

### CSS

To add CSS to the component, use the `css` function. It is a tagged template literal function. Use like the Lit `css` function.

Like so: 

```ts

css`/* CSS here */`

```



## Examples



### Counter

You can easily make a counter component like so: 



```ts

import createComponent, {renderOnAttributeChange} from "firefly.js";

createComponent(({count = "0"}, { onMount, useState, createProperty, use })=>{

    // If accessed outside of the component, rerender the changes to the 'count' attribute.

    use(renderOnAttributeChange);

    let [displayCount, setCount] = useState(parseInt(count));

    onMount(()=>{

        // Create the handleProperty event

        createProperty("handleClick", ()=>{

            setCount(++displayCount);

        });

    });

    // any on:[event]='[js here]' has its `this `context set to the component itself.

    return /* html */`

        <button on:click='this.handleClick()'>Clicked ${displayCount} times!</button>

    `;

// Name can be any string with at least one letter, then a '-' and then at least one more letter (A valid custom component name).

}, {name:"fy-counter"});

```

Then you can do this: 

```html

<fy-counter></fy-counter>

<fy-counter count="3"></fy-counter>

```

Which gives: 



<button>Clicked 0 times!</button>

<button>Clicked 3 times!</button>



### `<slot>` is supported as well!



```ts

createComponent(()=>{

    return `

        <slot></slot>

        <style>

            * {

                color:red;

            }

        </style>

    `;

}, {

    name:"text-red"

    shadowMode:"closed"

})

```

HTML:

```html

<text-red>I'm red!</text-red>

```

Rendering: 

<p style="color:red">I'm red!</p>

These are just some basic examples, and hopefully now you've got some ideas you want to do with Firefly. Fly away!
