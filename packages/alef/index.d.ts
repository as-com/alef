declare module "alef" {

  import { CSSProperties } from 'react';

  type TRuleProps = {};
  type TRule = (props: TRuleProps) => IStyle;
  type TKeyFrame = TRule;
  type TRendererCreator = (config?: IConfig) => IRenderer;
  type TPlugin = (style: IStyle) => IStyle; //http://alef.js.org/docs/advanced/Plugins.html
  type TEnhancer = (renderer: IRenderer) => IRenderer; //http://alef.js.org/docs/advanced/Enhancers.html

  const enum TSubscribeMessageType {
    rule = 1,
    staticObject = 1,
    keyframes = 2,
    fontFace = 3,
    staticString = 4,
    clear = 5
  }
  interface ISubscribeMessage {
    type: TSubscribeMessageType;
  }
  interface ISubscribeRuleOrStaticObjectMessage extends ISubscribeMessage { static?: boolean; declaration: string; selector: string; media: string; }
  interface ISubscribeKeyframesMessage extends ISubscribeMessage { name: string; keyframe: string; }
  interface ISubscribeFontFaceMessage extends ISubscribeMessage { fontFamily: string; fontFace: string; }
  interface ISubscribeStaticStringMessage extends ISubscribeMessage { css: string; }
  interface ISubscribeClearMessage extends ISubscribeMessage { }

  interface IRenderer {
    renderRule(rule: TRule, props: TRuleProps): string;
    renderKeyframe(keyFrame: TKeyFrame, props: TRuleProps): string;
    renderFont(family: string, files: Array<string>, props: TRuleProps): void;
    renderStatic(style: string, selector?: string): void;
    renderStatic(style: IStyle, selector: string): void;
    renderToString(): string;
    subscribe(event: (msg: ISubscribeRuleOrStaticObjectMessage | ISubscribeKeyframesMessage | ISubscribeFontFaceMessage | ISubscribeStaticStringMessage | ISubscribeClearMessage) => void): { unsubscribe: () => void; }
    clear(): void;
  }

  //http://alef.js.org/docs/advanced/RendererConfiguration.html
  interface IConfig {
    plugins?: Array<TPlugin>;
    keyframePrefixes?: Array<string>;
    enhancers?: Array<TEnhancer>;
    mediaQueryOrder?: Array<string>;
    selectorPrefix?: string;
  }

  interface IStyle extends CSSProperties {
    //TODO: add properties, missing in React.CSSProperties
  }

  function createRenderer(config?: IConfig): IRenderer;
  function combineRules(...rules: Array<TRule>): TRule;
  function enhance(...enhancers: Array<TEnhancer>): (rendererCreator: TRendererCreator) => TRendererCreator;
}

declare module "alef-dom" {
  import { IRenderer } from 'alef';
  function render(renderer: IRenderer, node: HTMLElement): any;
}

/**
 * ENHANCERS
 */
declare module "alef-beautifier" {
  import { TEnhancer } from "alef";

  export default function(): TEnhancer;
}

declare module "alef-font-renderer" {
  import { TEnhancer } from "alef";

  export default function(mountNode?: HTMLElement): TEnhancer;
}

declare module "alef-layout-debugger" {
  import { TEnhancer } from "alef";

  interface DebuggerOptions {
    mode?: "outline" | "backgroundColor";
    thickness?: number;
  }

  export default function(options: DebuggerOptions): TEnhancer;
}

declare module "alef-logger" {
  import { TEnhancer } from "alef";

  interface LoggerOptions {
    logCSS?: boolean;
    formatCSS?: boolean;
  }

  export default function(options: LoggerOptions): TEnhancer;
}

declare module "alef-monolithic" {
  import { TEnhancer } from "alef";

  export default function(): TEnhancer;
}

declare module "alef-perf" {
  import { TEnhancer } from "alef";

  export default function(): TEnhancer;
}

declare module "alef-statistics" {
  import { TEnhancer } from "alef";

  export default function(): TEnhancer;
}

/**
 * PLUGINS
 */
declare module "alef-plugin-custom-property" {
  import { TPlugin } from "alef";

  export default function(): TPlugin;
}

declare module "alef-plugin-extend" {
  import { TPlugin } from "alef";

  export default function(): TPlugin;
}

declare module "alef-plugin-fallback-value" {
  import { TPlugin } from "alef";

  export default function(): TPlugin;
}

declare module "alef-plugin-friendly-pseudo-class" {
  import { TPlugin } from "alef";

  export default function(): TPlugin;
}

declare module "alef-plugin-isolation" {
  import { TPlugin } from "alef";

  export default function(): TPlugin;
}

declare module "alef-plugin-logger" {
  import { TPlugin } from "alef";

  export default function(): TPlugin;
}

declare module "alef-plugin-lvha" {
  import { TPlugin } from "alef";

  export default function(): TPlugin;
}

declare module "alef-plugin-named-media-query" {
  import { TPlugin } from "alef";

  interface Parameters {
    [key: string]: string;
  }

  export default function(param: Parameters): TPlugin;
}

declare module "alef-plugin-placeholder-prefixer" {
  import { TPlugin } from "alef";

  export default function(): TPlugin;
}

declare module "alef-plugin-prefixer" {
  import { TPlugin } from "alef";

  export default function(): TPlugin;
}

declare module "alef-plugin-dynamic-prefixer" {
  import { TPlugin } from "alef";

  interface Configs {
    userAgent?: any;
    keepUnprefixed?: boolean;
  }

  export default function(configs: Configs): TPlugin;
}

declare module "alef-plugin-remove-undefined" {
  import { TPlugin } from "alef";

  export default function(): TPlugin;
}

declare module "alef-plugin-unit" {
  import { TPlugin } from "alef";

  type Unit = "ch" | "em" | "ex" | "rem" | "vh" | "vw" | "vmin" | "vmax" | "px" | "cm" | "mm" | "in" | "pc" | "pt" | "mozmm";
  interface UnitPerProperty {
    [key: string]: string;
  }

  export default function(unit?: Unit, unitPerProperty?: UnitPerProperty): TPlugin;
}

declare module "alef-plugin-validator" {
  import { TPlugin } from "alef";

  interface Configs {
    logInvalid?: boolean;
    deleteInvalid?: boolean;
  }

  export default function(configs: Configs): TPlugin;
}

/**
 * PRESETS
 */
declare module "alef-preset-web" {
  import { TPlugin } from "alef";

  const presets: TPlugin[];
  export default presets;
}

declare module "alef-preset-dev" {
  import { TPlugin } from "alef";

  const presets: TPlugin[];
  export default presets;
}

/**
 * TODO:
 *
 * 1. definition for `connect` is missing
 */
declare module "react-alef" {
  import * as React from "react";
  import { IRenderer } from "alef";

  interface ThemeProviderProps {
    theme: object;
    overwrite?: boolean;
  }

  /**
   * Alef Theme Provider
   */
  export class ThemeProvider extends React.Component<ThemeProviderProps, {}> { }

  interface ProviderProps {
    renderer: object;
    mountNode?: any;
  }

  /**
   * Alef Provider
   *
   * @see {@link https://github.com/as-com/alef/blob/master/modules/bindings/react/ThemeProvider.js}
   */
  export class Provider extends React.Component<ProviderProps, {}> { }

  type StyleFunction<Props> = (props: Props) => React.CSSProperties;

  type Style<Props> = React.CSSProperties | StyleFunction<Props>;

  type PassThroughProps = Array<string>;

  /**
   * Alef injects theme props.
   *
   * @see {@link https://github.com/as-com/alef/blob/master/modules/bindings/createComponentFactory.js#L52}
   */
  interface AlefInjectedProps {
    theme?: any;
    /**
     * To change the type on runtime and/or for each component, you may use the is prop.
     */
    is?: string;
    /**
     * This use case is especially important for library owners.
     * Instead of passing the passThroughProps to the createComponent call directly,
     * one can also use the passThrough prop on the created component to achieve the same effect.
     */
    passThrough?: PassThroughProps;
    /**
     * ref to underlying component
     *
     * @see {@link https://github.com/as-com/alef/blob/master/modules/bindings/createComponentFactory.js#L68}
     */
    innerRef?: (instance: any) => void;
  }

  /**
   * Returns a stateless HTML React component with Alef styles.
   *
   * @see {@link https://github.com/as-com/alef/blob/master/modules/bindings/createComponentFactory.js#L15-L82}
   */
  type AlefHtmlComponent<Props, Elem> = React.ComponentClass<Props & AlefInjectedProps & React.HTMLProps<Elem>>;

  /**
   * Returns a stateless SVG React component with Alef styles.
   */
  type AlefSvgComponent<Props, Elem extends SVGElement> = React.ComponentClass<Props & AlefInjectedProps & React.SVGAttributes<Element>>;

  /**
   * By default, Alef returns a `div` stateless React component.
   *
   * @see {@link https://github.com/as-com/alef/blob/master/modules/bindings/createComponentFactory.js#L12}
   */
  type DefaultAlefHtmlComponent<Props> = AlefHtmlComponent<Props, HTMLDivElement>;

  /**
   *
   * @param {Style} style - style function
   */
  export function createComponent<Props>(style: Style<Props>): DefaultAlefHtmlComponent<Props>;

  /**
   *
   * @param {Style} style - style function
   * @param {string} base - HTML element tag name
   * @param {Array<string>} passThroughProps - A list of props that get passed to the underlying element.
   */
  export function createComponent<Props, Elem extends HTMLElement>(style: Style<Props>, base: string, passThroughProps?: Array<string>): AlefHtmlComponent<Props, Elem>;

  /**
   *
   * @param {Style} style - style function
   * @param {AlefHtmlComponent} base - Alef component
   * @param {Array<string>} passThroughProps - A list of props that get passed to the underlying element.
   */
  export function createComponent<Props, BaseProps, Elem extends HTMLElement>(style: Style<Props>, base: AlefHtmlComponent<BaseProps, Elem>, passThroughProps?: Array<string>): AlefHtmlComponent<BaseProps & Props, Elem>;

  export function createComponent<Props>(style: Style<Props>, base: "a", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLAnchorElement>;
  export function createComponent<Props>(style: Style<Props>, base: "abbr", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "address", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "area", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLAreaElement>;
  export function createComponent<Props>(style: Style<Props>, base: "article", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "aside", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "audio", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLAudioElement>;
  export function createComponent<Props>(style: Style<Props>, base: "b", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "base", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLBaseElement>;
  export function createComponent<Props>(style: Style<Props>, base: "bdi", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "bdo", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "big", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "blockquote", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "body", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLBodyElement>;
  export function createComponent<Props>(style: Style<Props>, base: "br", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLBRElement>;
  export function createComponent<Props>(style: Style<Props>, base: "button", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLButtonElement>;
  export function createComponent<Props>(style: Style<Props>, base: "canvas", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLCanvasElement>;
  export function createComponent<Props>(style: Style<Props>, base: "caption", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "cite", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "code", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "col", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLTableColElement>;
  export function createComponent<Props>(style: Style<Props>, base: "colgroup", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLTableColElement>;
  export function createComponent<Props>(style: Style<Props>, base: "data", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "datalist", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLDataListElement>;
  export function createComponent<Props>(style: Style<Props>, base: "dd", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "del", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "details", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "dfn", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "dialog", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "div", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLDivElement>;
  export function createComponent<Props>(style: Style<Props>, base: "dl", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLDListElement>;
  export function createComponent<Props>(style: Style<Props>, base: "dt", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "em", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "embed", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLEmbedElement>;
  export function createComponent<Props>(style: Style<Props>, base: "fieldset", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLFieldSetElement>;
  export function createComponent<Props>(style: Style<Props>, base: "figcaption", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "figure", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "footer", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "form", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLFormElement>;
  export function createComponent<Props>(style: Style<Props>, base: "h1", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLHeadingElement>;
  export function createComponent<Props>(style: Style<Props>, base: "h2", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLHeadingElement>;
  export function createComponent<Props>(style: Style<Props>, base: "h3", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLHeadingElement>;
  export function createComponent<Props>(style: Style<Props>, base: "h4", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLHeadingElement>;
  export function createComponent<Props>(style: Style<Props>, base: "h5", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLHeadingElement>;
  export function createComponent<Props>(style: Style<Props>, base: "h6", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLHeadingElement>;
  export function createComponent<Props>(style: Style<Props>, base: "head", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLHeadElement>;
  export function createComponent<Props>(style: Style<Props>, base: "header", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "hgroup", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "hr", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLHRElement>;
  export function createComponent<Props>(style: Style<Props>, base: "html", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLHtmlElement>;
  export function createComponent<Props>(style: Style<Props>, base: "i", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "iframe", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLIFrameElement>;
  export function createComponent<Props>(style: Style<Props>, base: "img", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLImageElement>;
  export function createComponent<Props>(style: Style<Props>, base: "input", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLInputElement>;
  export function createComponent<Props>(style: Style<Props>, base: "ins", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLModElement>;
  export function createComponent<Props>(style: Style<Props>, base: "kbd", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "keygen", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "label", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLLabelElement>;
  export function createComponent<Props>(style: Style<Props>, base: "legend", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLLegendElement>;
  export function createComponent<Props>(style: Style<Props>, base: "li", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLLIElement>;
  export function createComponent<Props>(style: Style<Props>, base: "link", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLLinkElement>;
  export function createComponent<Props>(style: Style<Props>, base: "main", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "map", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLMapElement>;
  export function createComponent<Props>(style: Style<Props>, base: "mark", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "menu", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "menuitem", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "meta", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLMetaElement>;
  export function createComponent<Props>(style: Style<Props>, base: "meter", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "nav", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "noindex", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "noscript", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "object", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLObjectElement>;
  export function createComponent<Props>(style: Style<Props>, base: "ol", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLOListElement>;
  export function createComponent<Props>(style: Style<Props>, base: "optgroup", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLOptGroupElement>;
  export function createComponent<Props>(style: Style<Props>, base: "option", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLOptionElement>;
  export function createComponent<Props>(style: Style<Props>, base: "output", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "p", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLParagraphElement>;
  export function createComponent<Props>(style: Style<Props>, base: "param", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLParamElement>;
  export function createComponent<Props>(style: Style<Props>, base: "picture", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLPictureElement>;
  export function createComponent<Props>(style: Style<Props>, base: "pre", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLPreElement>;
  export function createComponent<Props>(style: Style<Props>, base: "progress", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLProgressElement>;
  export function createComponent<Props>(style: Style<Props>, base: "q", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLQuoteElement>;
  export function createComponent<Props>(style: Style<Props>, base: "rp", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "rt", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "ruby", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "s", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "samp", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "script", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "section", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "select", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLSelectElement>;
  export function createComponent<Props>(style: Style<Props>, base: "small", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "source", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLSourceElement>;
  export function createComponent<Props>(style: Style<Props>, base: "span", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLSpanElement>;
  export function createComponent<Props>(style: Style<Props>, base: "strong", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "style", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLStyleElement>;
  export function createComponent<Props>(style: Style<Props>, base: "sub", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "summary", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "sup", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "table", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLTableElement>;
  export function createComponent<Props>(style: Style<Props>, base: "tbody", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLTableSectionElement>;
  export function createComponent<Props>(style: Style<Props>, base: "td", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLTableDataCellElement>;
  export function createComponent<Props>(style: Style<Props>, base: "textarea", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLTextAreaElement>;
  export function createComponent<Props>(style: Style<Props>, base: "tfoot", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLTableSectionElement>;
  export function createComponent<Props>(style: Style<Props>, base: "th", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLTableHeaderCellElement>;
  export function createComponent<Props>(style: Style<Props>, base: "thead", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLTableSectionElement>;
  export function createComponent<Props>(style: Style<Props>, base: "time", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "title", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLTitleElement>;
  export function createComponent<Props>(style: Style<Props>, base: "tr", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLTableRowElement>;
  export function createComponent<Props>(style: Style<Props>, base: "track", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLTrackElement>;
  export function createComponent<Props>(style: Style<Props>, base: "u", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "ul", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLUListElement>;
  export function createComponent<Props>(style: Style<Props>, base: "var", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;
  export function createComponent<Props>(style: Style<Props>, base: "video", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLVideoElement>;
  export function createComponent<Props>(style: Style<Props>, base: "wbr", passThroughProps?: PassThroughProps): AlefHtmlComponent<Props, HTMLElement>;

  export function createComponent<Props>(style: Style<Props>, base: "svg", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "circle", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "clipPath", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "defs", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "desc", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "ellipse", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feBlend", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feColorMatrix", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feComponentTransfer", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feComposite", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feConvolveMatrix", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feDiffuseLighting", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feDisplacementMap", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feDistantLight", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feFlood", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feFuncA", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feFuncB", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feFuncG", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feFuncR", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feGaussianBlur", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feImage", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feMerge", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feMergeNode", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feMorphology", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feOffset", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "fePointLight", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feSpecularLighting", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feSpotLight", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feTile", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "feTurbulence", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "filter", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "foreignObject", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "g", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "image", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "line", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "linearGradient", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "marker", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "mask", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "metadata", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "path", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "pattern", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "polygon", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "polyline", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "radialGradient", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "rect", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "stop", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "switch", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "symbol", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "text", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "textPath", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "tspan", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "use", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
  export function createComponent<Props>(style: Style<Props>, base: "view", passThroughProps?: PassThroughProps): AlefSvgComponent<Props, SVGElement>;
}
