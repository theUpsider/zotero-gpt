declare global {
  const __env__: "production" | "development"
  const _globalThis: {
    [key: string]: any
    Zotero: _ZoteroTypes.Zotero
    // ZoteroPane: _ZoteroTypes.ZoteroPane;
    // window: Window;
    // document: Document;
    ztoolkit: ZToolkit
    addon: typeof addon
  }
  type ZToolkit = import("../settings/addon").CustomToolkit
  const ztoolkit: ZToolkit
  const rootURI: string
  const addon: import("../settings/addon").default
}

// Use the Components.classes type directly; avoids importing non-module d.ts files
export type nsXPCComponents_Classes = typeof Components.classes
