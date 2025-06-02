import { useUserContext } from '@/context/UserContext';

const formatDate = (date: Date) => {
  const day = date.getDate();
  const suffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  return `${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${date.toLocaleDateString('en-US', { month: 'long' })} ${day}${suffix(day)} ${date.getFullYear()}`;
};

export default function Header() {
  const { user } = useUserContext();
  const today = new Date();

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-300">
      <div className="flex items-center justify-between p-0.5">
        <div>
          {user && (
            <span className="text-sm font-bold block">
              Hey, {user.email.split('@')[0]}!
            </span>
          )}
          <span className="text-xs block text-stone-500">
            {formatDate(today)}
          </span>
        </div>
      </div>
    </div>
  );
}