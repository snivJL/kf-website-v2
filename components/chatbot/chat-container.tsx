'use client';

type ChatContainerProps = {
  initialUserMessage: string;
};
export default function ChatContainer({
  initialUserMessage,
}: ChatContainerProps) {
  return (
    <div className="grid h-[calc(100vh_-_96px)] w-screen place-items-center">
      <div>{initialUserMessage}</div>
    </div>
  );
}
