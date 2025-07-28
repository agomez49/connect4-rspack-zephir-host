// Simplified react-env.d.ts - Only what's actually needed

// CSS imports (for index.css)
declare module "*.css" {
  const css: string;
  export default css;
}

// SVG imports (for react.svg asset)
declare module "*.svg" {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const content: string;
  export { ReactComponent };
  export default content;
}

// CSS Modules (if you plan to use them)
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
