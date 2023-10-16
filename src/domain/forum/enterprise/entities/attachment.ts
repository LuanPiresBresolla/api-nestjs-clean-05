import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AttachmentProps {
  title: string
  link: string
}

export class Attachment extends Entity<AttachmentProps> {
  static create(props: AttachmentProps, id?: UniqueEntityID) {
    const attachment = new Attachment(props, id)
    return attachment
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
  }

  get link() {
    return this.props.link
  }

  set link(link: string) {
    this.props.link = link
  }
}
