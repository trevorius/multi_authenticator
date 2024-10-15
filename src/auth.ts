import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@/services/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, request) => {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          // Find the user in the database
          const user = await prisma.user.findUnique({
            where: { username: credentials.username },
          });

          if (!user) {
            return null;
          }

          // Compare the provided password with the hashed password in the database
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          // Return user object if validation is successful
          return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
          };
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
});

export const getUser = async () => {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  return user;
};
