export default class mHTMLCompiler {
    private readonly customTags;
    compile(html: string, findFrom?: HTMLElement | Document): string;
    private parseHTML;
    private compileNode;
    private compileAttributes;
    private interpolate;
}
