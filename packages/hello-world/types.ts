declare module '@rhight/hello-world' {
  export interface IHelloWorld {
    /** Флаг начального состояния галки */
    active?: boolean
  }

  const HelloWorld: React.FC<IHelloWorld>;
  export default HelloWorld;
}
