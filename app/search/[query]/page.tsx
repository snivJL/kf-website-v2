import ChatContainer from '@/components/chat-container';
import { SearchParams } from '@/types';

export default async function SearchPage({
  params,
}: {
  params: Promise<SearchParams>;
}) {
  const { query } = await params;
  if (!query) {
    return <p className="prose mx-auto py-16">No query provided.</p>;
  }
  return (
    <div className="h-[calc(100vh_-_96px)] w-screen">
      <ChatContainer initialUserMessage={query as string} />
    </div>
  );
}
