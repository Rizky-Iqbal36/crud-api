expect.extend({
  dateNewerThan(received, argument): any {
    const condition: boolean = received > argument
    const description: string = condition ? 'newer' : 'older'
    return {
      pass: condition,
      message: () => `${received} is ${description} than ${argument}`
    }
  }
})

export default undefined
