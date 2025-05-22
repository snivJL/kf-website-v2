import { Chat } from '@/components/chat';

export default function ChatPage() {
  return (
    <Chat
      initialMessages={[]}
      //   initialVisibilityType="private"
      isReadonly={false}
      //   session={session}
      autoResume={false}
    />
  );
}
