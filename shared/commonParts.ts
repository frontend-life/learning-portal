export interface AttachmentCommon {
  _id: string;
  path: string;
}
export interface MessageCommon<AttachType = AttachmentCommon> {
  _id: string;
  senderId: string;
  text: string;
  chatId?: string;
  attachments?: Array<AttachType>;
  createdAt?: string;
}

export interface HomeworkCommon {
  _id: string;
  studentId: string;
  lessonId: string;
  chatId?: string;
}
export interface ChatCommon {
  _id: string;
  messages: string[];
}
