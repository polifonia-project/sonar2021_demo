export interface Message {
  visible: boolean;
  messageText: string;
  type: 'info' | 'done' | 'delete' | 'warning';
}
