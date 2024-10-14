import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserButton } from '@/components/UserButton';
import { ThemeToggleButton } from './ThemeToggleButton';

const navItems = [
  { name: 'Dashboard', href: '/protected/dashboard' },
  { name: 'Add Environment', href: '/protected/dashboard/add-environment' },
];

export function Sidebar() {
  return (
    <div className='flex flex-col h-screen w-64 bg-gray-100 dark:bg-gray-900 shadow-lg shadow-gray-500 p-4'>
      <div className='mb-6 flex justify-between'>
        <ThemeToggleButton />
        <UserButton />
      </div>
      <nav className='space-y-2'>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button variant='ghost' className='w-full justify-start'>
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
