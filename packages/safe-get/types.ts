declare module '@rhight/safe-get' {
  export type SafeGetType = <T, V = null>(getPropFn: () => T, fallback: V | null) => T | V;

  const safeGet: SafeGetType;
  export default safeGet;
}
