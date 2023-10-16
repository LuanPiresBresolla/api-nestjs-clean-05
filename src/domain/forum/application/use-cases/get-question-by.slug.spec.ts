import { GetQuestionBySlug } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositoires/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositoires/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: GetQuestionBySlug

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new GetQuestionBySlug(inMemoryQuestionsRepository)
  })

  it('should be able get question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-test-slug'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-test-slug',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.question.id).toBeTruthy()
      expect(result.value.question.slug.value).toEqual(newQuestion.slug.value)
    }
  })
})
