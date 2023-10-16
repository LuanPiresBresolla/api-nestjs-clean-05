import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositoires/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositoires/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able create a new question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'Teste',
      content: 'Nova pergunta',
      attachmentsIds: ['1', '2'],
    })

    const newQuestion = inMemoryQuestionsRepository.items[0]

    expect(result.isRight()).toBe(true)
    expect(newQuestion).toEqual(result.value?.question)
    expect(newQuestion.attachments.currentItems).toHaveLength(2)
    expect(newQuestion.attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
