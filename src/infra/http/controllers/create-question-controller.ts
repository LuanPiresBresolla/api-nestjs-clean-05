import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { z } from 'zod'

const bodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidation = new ZodValidationPipe(bodySchema)

type CreateQuestionBody = z.infer<typeof bodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes()
  async handle(
    @Body(bodyValidation) body: CreateQuestionBody,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub
    const { content, title } = body

    const slug = 'slug-' + new Date().getTime()

    await this.prisma.question.create({
      data: {
        content,
        title,
        authorId: userId,
        slug,
      },
    })
  }
}
