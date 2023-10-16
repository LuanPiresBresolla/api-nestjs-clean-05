import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'

import { z } from 'zod'

const querySchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidation = new ZodValidationPipe(querySchema)

type FetchQueryParams = z.infer<typeof querySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@Query('page', queryValidation) page: FetchQueryParams) {
    const questions = await this.prisma.question.findMany({
      take: 20,
      skip: (page - 1) * 1,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return { questions }
  }
}
