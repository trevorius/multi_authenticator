import AuthStatus from '@/components/AuthStatus';

export default function Home() {
  return (
    <div>
      <h1>This route is protected</h1>
      <AuthStatus />
    </div>
  );
}
