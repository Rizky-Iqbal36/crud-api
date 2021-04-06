expect.extend({
  dateNewerThan(received, argument): any {
    const condition: boolean = received > argument
    return {
      pass: condition,
      message: () => `${received} is ${condition ? 'newer' : 'older'} than ${argument}`
    }
  },
  newFunc(): any {
    return {
      pass: true,
      message: () => 'true'
    }
  }
})

export default undefined
