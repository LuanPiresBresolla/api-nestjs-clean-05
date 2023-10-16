import { QuestionsAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionsAttachmentsRepository
{
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    return this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )
  }

  async deleteManyByQuestionId(questionId: string) {
    const list = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )
    this.items = list
  }
}
