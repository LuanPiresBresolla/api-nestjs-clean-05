import { Either, right } from '@/core/either'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

interface Request {
  page: number
}

type Response = Either<
  null,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({ page }: Request): Promise<Response> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({ questions })
  }
}
