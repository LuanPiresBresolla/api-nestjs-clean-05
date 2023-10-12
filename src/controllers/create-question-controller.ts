import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { z } from 'zod'

import { PrismaService } from '../prisma/prisma.service'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { UserPayload } from 'src/auth/jwt.strategy'

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
