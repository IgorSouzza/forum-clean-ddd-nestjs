import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'

import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let answersRepository: InMemoryAnswersRepository
let answerCommentRepository: InMemoryAnswerCommentsRepository
let answerAttachmentRepository: InMemoryAnswerAttachmentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    answerAttachmentRepository = new InMemoryAnswerAttachmentsRepository()
    answersRepository = new InMemoryAnswersRepository(
      answerAttachmentRepository,
    )
    answerCommentRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(answersRepository, answerCommentRepository)
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await answersRepository.create(answer)

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: 'Test comment',
    })

    expect(answerCommentRepository.items[0].content).toEqual('Test comment')
  })
})
