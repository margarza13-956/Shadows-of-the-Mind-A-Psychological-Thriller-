// Type declarations for Vite's raw asset imports, e.g.
//   import text from "./file.md?raw";
declare module "*?raw" {
  const content: string;
  export default content;
}
