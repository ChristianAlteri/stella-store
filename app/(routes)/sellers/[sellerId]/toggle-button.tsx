'use client'
import { useRouter, useSearchParams } from 'next/navigation';

const ToggleButton = ({ currentIsArchived }: { currentIsArchived: boolean }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleToggle = () => {
    const newIsArchived = !currentIsArchived; // Toggle the boolean
    const params = new URLSearchParams(searchParams.toString());

    if (!newIsArchived) {
      params.delete('isArchived');
    } else {
      params.set('isArchived', 'true');
    }

    const newSearch = params.toString();
    const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}`;
    router.push(newUrl);
  };

  return (
    <button onClick={handleToggle} className="toggle-button">
      {currentIsArchived ? 'Show Live Products' : 'Show Sold Products'}
    </button>
  );
};

export default ToggleButton;
