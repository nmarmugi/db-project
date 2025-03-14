export type Message = {
  [key: string]: string | undefined;
};

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {message.success && (
        <div className="text-green-600 border-l-2 border-green-600 px-4">
          {message.success}
        </div>
      )}
      {message.error && (
        <div className="text-red-600 border-l-2 border-red-600 px-4">
          {message.error}
        </div>
      )}
      {message.message && (
        <div className="text-orange-600 border-l-2 border-orange-600 px-4">
          {message.message}
        </div>
      )}
    </div>
  );
}
