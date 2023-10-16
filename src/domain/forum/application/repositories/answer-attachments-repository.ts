import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export interface AnswersAttachmentsRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  deleteManyByAnswerId(answerId: string): Promise<void>
}
