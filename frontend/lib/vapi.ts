
// Use 'any' type to avoid explicit dependency on the package types during SSG/SSR if possible,
// or just strictly guard the import.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let vapiInstance: any;

if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Vapi = require('@vapi-ai/web').default;
    vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
} else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vapiInstance = {} as any;
}

export const vapi = vapiInstance;