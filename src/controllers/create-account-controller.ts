import {
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { z } from 'zod'

import { PrismaService } from '../prisma/prisma.service'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBody = z.infer<typeof bodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: CreateAccountBody) {
    const { email, name, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: { email },
    })

    if (userWithSameEmail) {
      throw new ConflictException('User with same email address already exists')
    }

    const hashedPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: { email, name, password: hashedPassword },
    })
  }
}
