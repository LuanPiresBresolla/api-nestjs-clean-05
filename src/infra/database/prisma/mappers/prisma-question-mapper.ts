import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { Question as PrismaQuestion, Prisma } from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(question: PrismaQuestion) {
    return Question.create(
      {
        title: question.title,
        content: question.content,
        slug: Slug.create(question.slug),
        authorId: new UniqueEntityID(question.authorId),
        bestAnswerId: question.bestAnswerId
          ? new UniqueEntityID(question.bestAnswerId)
          : null,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      },
      new UniqueEntityID(question.id),
    )
  }

  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
    return {
      id: question.id.toString(),
      authorId: question.authorId.toString(),
      bestAnswerId: question.bestAnswerId?.toString(),
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
