import { Chat } from '@/components/chat';

export default function ChatPage() {
  return <Chat initialMessages={[]} isReadonly={false} autoResume={false} />;
}
