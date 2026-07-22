/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

// Build-time flag: true only in the single-file demo build (SINGLEFILE=1),
// which enables an in-app puzzle picker. Real builds keep the daily rotation.
declare const __DEMO__: boolean;
