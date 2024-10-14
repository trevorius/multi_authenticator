import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials, request) => {
        let user = null;
        
        const AdminUser = { id: "1", name: "Admin",username: "admin", email: "admin@example.com", password: "admin" }

          if (credentials.username === AdminUser.username && credentials.password === AdminUser.password) {
            return AdminUser
          }
          return null
      }

    
    })
  ],
})

