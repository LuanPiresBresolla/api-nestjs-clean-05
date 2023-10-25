import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryStudentsRepository } from 'test/repositoires/in-memory-students-repository'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let sut: RegisterStudentUseCase

describe('Register Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHasher)
  })

  it('should be able create a new student', async () => {
    const result = await sut.execute({
      email: 'student@example.com',
      name: 'Student',
      password: '123456',
    })

    const student = inMemoryStudentsRepository.items[0]

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student,
    })
  })

  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      email: 'student@example.com',
      name: 'Student',
      password: '123456',
    })

    const student = inMemoryStudentsRepository.items[0]

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(student.password).toEqual(hashedPassword)
  })
})
