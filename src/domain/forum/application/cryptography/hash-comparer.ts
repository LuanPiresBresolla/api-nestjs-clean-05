export abstract class HasheComparer {
  abstract compare(plain: string, hash: string): Promise<boolean>
}
