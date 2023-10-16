import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  constructor(
    private answersAttachmentsRepository: AnswersAttachmentsRepository,
  ) {}

  async create(answer: Answer) {
    this.items.push(answer)
    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(index, 1)
    await this.answersAttachmentsRepository.deleteManyByAnswerId(
      answer.id.toString(),
    )
  }

  async save(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id)
    this.items[index] = answer
    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) return null

    return answer
  }

  async findManyByQuestionId(id: string, { page }: PaginationParams) {
    return this.items
      .filter((item) => item.questionId.toString() === id)
      .slice((page - 1) * 20, page * 20)
  }
}
