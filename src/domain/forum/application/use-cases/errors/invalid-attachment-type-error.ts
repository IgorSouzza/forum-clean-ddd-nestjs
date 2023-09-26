import { UseCaseError } from '@/core/types/use-case-error'

export class InvalidAttachmentTypeError extends Error implements UseCaseError {
  constructor(type: string) {
    super(`File type ${type} is not valid.`)
  }
}
