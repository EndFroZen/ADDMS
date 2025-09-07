/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_BASE_URL: string
  readonly NEXT_PUBLIC_NToken: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
export const NToken = process.env.NEXT_PUBLIC_NToken!;
