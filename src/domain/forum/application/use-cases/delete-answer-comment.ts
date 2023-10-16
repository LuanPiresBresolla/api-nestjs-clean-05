import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface Request {
  answerCommentId: string
  authorId: string
}

type Response = Either<ResourceNotFoundError | NotAllowedError, null>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({ answerCommentId, authorId }: Request): Promise<Response> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right(null)
  }
}
