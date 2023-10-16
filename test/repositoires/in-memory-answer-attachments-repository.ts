import { AnswersAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswersAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    return this.items.filter((item) => item.answerId.toString() === answerId)
  }

  async deleteManyByAnswerId(answerId: string) {
    const list = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )
    this.items = list
  }
}
