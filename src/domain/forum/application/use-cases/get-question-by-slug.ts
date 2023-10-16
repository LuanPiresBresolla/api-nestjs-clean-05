import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Question } from '@/domain/forum/enterprise/entities/question'

interface Request {
  slug: string
}

type Response = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlug {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({ slug }: Request): Promise<Response> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({ question })
  }
}
