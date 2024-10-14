'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserButton } from '@/components/UserButton';
import { ThemeToggleButton } from './ThemeToggleButton';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/protected/dashboard' },
  { name: 'Add Environment', href: '/protected/dashboard/add-environment' },
];

export function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const SidebarContent = () => (
    <div className='flex flex-col h-full w-full bg-gray-100 dark:bg-gray-900 p-4 shadow-lg shadow-gray-500'>
      <div className='mb-6 flex justify-between mt-10 md:mt-0'>
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

  return (
    <>
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              className='fixed top-4 right-4 z-50'
            >
              <Menu className='h-[1.2rem] w-[1.2rem]' />
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='p-0 w-64'>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      ) : (
        <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
          <SidebarContent />
        </div>
      )}
    </>
  );
}
