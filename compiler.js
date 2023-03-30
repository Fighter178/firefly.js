"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class mHTMLCompiler {
    constructor() {
        this.customTags = {
            btn: 'button',
            vid: 'video',
            group: 'div',
            if: 'div',
            else: 'div',
            each: 'div'
        };
    }
    compile(html, findFrom = document) {
        const dom = this.parseHTML(html);
        let res = [];
        dom.childNodes.forEach((child) => {
            res.push(this.compileNode(child, findFrom));
        });
        return "<!-- Compiled mHTML (magical HTML). Compiled by Firefly.js Github: https://github.com/Fighter178/firelfy.js NPM: https://npmjs.com/firelfly.js -->" + res.join('').trim();
    }
    parseHTML(html) {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content;
    }
    compileNode(node, from) {
        const document = from;
        if (!node) {
            return '';
        }
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent || '';
        }
        if (node.nodeType !== Node.ELEMENT_NODE) {
            return '';
        }
        const el = node;
        const customTag = el.tagName.toLocaleLowerCase();
        const tag = this.customTags[customTag] || customTag;
        if (customTag === 'group' && el.hasAttribute('class') && el.getAttribute('class')?.split(' ').includes('group')) {
            return `<div class="group">${el.innerHTML}</div>`;
        }
        if (customTag === 'if') {
            const condition = new Function(`return ${el.getAttribute("c")}`)();
            const content = Array.from(el.childNodes).map((child) => this.compileNode(child, from)).join('');
            const elseContent = Array.from(el.children)
                .find((child) => child.tagName.toLowerCase() === 'else')
                ?.innerHTML;
            return `<div>${condition ? content : elseContent || ''}</div>`;
        }
        if (customTag === "else") {
            return "";
        }
        if (customTag === 'each' && el.hasAttribute('of')) {
            const array = new Function(`return ${el.getAttribute('of')}`)();
            const variableName = el.getAttribute('as') || "";
            const indexName = el.getAttribute('index') || '';
            const content = array.map((item, index) => {
                const variables = { [variableName]: item, [indexName]: index };
                const innerHTML = Array.from(el.childNodes).map((child) => this.compileNode(child, from)).join('');
                const compiledHTML = this.interpolate(innerHTML, variables);
                return compiledHTML;
            }).join('');
            return `<div>${content}</div>`;
        }
        if (customTag === 'tooltip') {
            const content = Array.from(el.childNodes).map((child) => this.compileNode(child, from)).join('');
            const tooltipText = el.getAttribute('text') || '';
            const position = el.getAttribute('ps') || 'top';
            return `
            <span class="fy-tooltip">
              <span class="fy-tooltip-text fy-pos-${position}">${tooltipText}</span>
              ${content}
            </span>
          `;
        }
        // Not working.
        // if (customTag === 'modal') {
        //   const content = Array.from(el.childNodes).map((child) => this.compileNode(child, from)).join('');
        //   const modalId = el.getAttribute('id') || '';
        //   const triggerText = el.getAttribute('trigger-text') || '';
        //   return `
        //     <div>
        //       <button onclick="${from}.getElementById('${modalId}').style.display='block'">${triggerText}</button>
        //       <div id="${modalId}" class="modal">
        //         <div class="modal-content">
        //           <span onclick="${from}.getElementById('${modalId}').style.display='none'" class="close">&times;</span>
        //           ${content}
        //         </div>
        //       </div>
        //     </div>
        //   `;
        // }
        const attributes = this.compileAttributes(el);
        const children = Array.from(el.childNodes)
            .map((child) => this.compileNode(child, from))
            .join('');
        return `<${tag}${attributes}>${children}</${tag}>`;
    }
    compileAttributes(el) {
        return Array.from(el.attributes)
            .map((attribute) => ` ${attribute.name}="${attribute.value}"`)
            .join('');
    }
    interpolate(html, variables) {
        let resHTML = html;
        for (const key in variables) {
            resHTML = resHTML.replaceAll(`{${key}}`, variables[key]);
        }
        return resHTML;
    }
}
exports.default = mHTMLCompiler;
