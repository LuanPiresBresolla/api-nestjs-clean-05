import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { InMemoryNotificationsRepository } from 'test/repositoires/in-memory-notifications-repository'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('Create Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to send notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Notificação',
      content: 'Nova notificação',
    })

    const newNotification = inMemoryNotificationsRepository.items[0]

    expect(result.isRight()).toBe(true)
    expect(newNotification).toEqual(result.value?.notification)
  })
})
