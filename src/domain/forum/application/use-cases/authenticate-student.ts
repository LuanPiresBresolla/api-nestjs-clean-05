import { Either, left, right } from '@/core/either'
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { HasheComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { WrongCredentialsError } from '@/domain/forum/application/use-cases/errors/wrong-credentials-error'
import { Injectable } from '@nestjs/common'

interface Request {
  email: string
  password: string
}

type Response = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hasheComparer: HasheComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({ email, password }: Request): Promise<Response> {
    const student = await this.studentsRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }

    const isPasswordMatch = await this.hasheComparer.compare(
      password,
      student.password,
    )

    if (!isPasswordMatch) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })

    return right({ accessToken })
  }
}
