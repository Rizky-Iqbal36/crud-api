export {}
declare global {
  namespace jest {
    interface Matchers<R> {
      dateNewerThan(argument: any): R
      newFunc(): R
    }
  }
}
