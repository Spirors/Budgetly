import { useUserContext } from '@/context/UserContext';

export default function AccountToggle() {
  const { user } = useUserContext();

  return (
    <div className="mb-5">
      <button 
        className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center"
        aria-label="User account"
      >
        <img
          src="https://api.dicebear.com/9.x/lorelei/svg?seed=Chase"
          alt="User avatar"
          className="size-8 rounded bg-violet-500 shadow"
          width={32}
          height={32}
        />
        {user && (
          <div className="text-start">
            <span className="text-sm font-bold block">{user.email.split('@')[0]}</span>
            <span className="text-xs block text-stone-500">{user.email}</span>
          </div>
        )}
      </button>
    </div>
  );
}