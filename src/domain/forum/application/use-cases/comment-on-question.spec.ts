import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'

import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let questionsRepository: InMemoryQuestionsRepository
let questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let questionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    questionsRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository,
    )
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      questionsRepository,
      questionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await questionsRepository.create(question)

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: 'Test comment',
    })

    expect(questionCommentsRepository.items[0].content).toEqual('Test comment')
  })
})
