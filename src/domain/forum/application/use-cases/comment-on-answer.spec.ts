import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositoires/in-memory-answer-attachments-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositoires/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositoires/in-memory-answers-repository'

let answersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let answerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment On Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    answersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      answersRepository,
      answerCommentsRepository,
    )
  })

  it('should be able create a new comment for a answer', async () => {
    const answer = makeAnswer()
    await answersRepository.create(answer)

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: 'Novo Comentário',
    })

    expect(answerCommentsRepository.items[0].id).toBeTruthy()
    expect(answerCommentsRepository.items[0].content).toEqual('Novo Comentário')
  })
})
