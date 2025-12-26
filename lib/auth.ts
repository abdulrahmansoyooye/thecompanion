// import Credentials from "@auth/core/providers/credentials";
import NextAuth from "next-auth";
import Google  from 'next-auth/providers/google';
export const {handlers,signIn,signOut,auth} =  NextAuth({
    providers:[
      Google,
    Google({
      clientId:process.env.AUTH_GOOGLE_ID,
      clientSecret:process.env.AUTH_GOOGLE_SECRET
    })
    ],
    session:{strategy:"jwt"},
    callbacks:{
        async jwt({token,account}) {
           if (account?.id_token) token.idtoken = account.id_token
            return token
        },
        async session({ session,token}){
           session.idtoken = token.idtoken
           return session
              }
   }
})

        // Credentials({
        //     name:"Credentials",
        //     credentials:{
        //         email:{label:"Email",type:"text"},
        //         password:{lable:"Password",type:"password"}
        //     },
        //     async authorize(credentials){
        //         const res = await fetch({});

        //      const user =    await res.json();
              
        //      if(res.ok && user) return user;
        //      throw new Error("Invalid login")

        //     }
        // })