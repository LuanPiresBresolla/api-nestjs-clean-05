import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { HasheComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HasheGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HasheComparer,
      useClass: BcryptHasher,
    },
    {
      provide: HasheGenerator,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HasheComparer, HasheGenerator],
})
export class CryptographyModule {}
