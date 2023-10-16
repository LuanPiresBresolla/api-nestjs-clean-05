import { Either, left, right } from '@/core/either'

function doSomething(isSuccess: boolean): Either<string, number> {
  if (isSuccess) return right(10)

  return left('error')
}

test('success result', () => {
  const response = doSomething(true)

  expect(response.isRight()).toBe(true)
  expect(response.isLeft()).toBe(false)
})
test('error result', () => {
  const response = doSomething(false)

  expect(response.isLeft()).toBe(true)
  expect(response.isRight()).toBe(false)
})
