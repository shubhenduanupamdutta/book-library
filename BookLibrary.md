# Project 3 - Book Library

## Code Along for the Book Library Project

---

## Creating a base app

```
npx sv create book-library
```

### Configurations during project creation

- Using TypeScript
- Minimal SvelteKit
- ESLint
- Prettier
- npm

---

## Using Supabase for Authentication

_Supabase is an open-source Firebase alternative, built on top of Postgres_

1. First create a Supabase account and project (Just follow the prompts). Try to keep the location as near to your location as possible.
2. Once the project is created, go to the project settings and copy the URL and the public key, and put it in the `.env` file. If you can't find it then go to `View API Settings` and copy the URL and the public key.
3. Install the Supabase client library by running the following command:
   _We need to install `@supabase/ssr` also because we are using SvelteKit, which is a server-side rendering framework._

```bash
npm install @supabase/ssr @supabase/supabase-js
```

4. Then you can on server side use this

```ts
// Registration Flow
const supabase = createClient(PUBLIC_SUPABASE_DB_URL, PUBLIC_SUPABASE_ANON_KEY);

const {data, error } = await supabase.auth.signUp({
    email, password
})

if (error || !data.user) {
    console.log("There has been an error", error);
    return fail(400);
}

redirect(303, '/private/dashboard');
```
5. You can go to Home -> Authentication -> Users to see if the user has been created. Currently this only works with the the email you created the instance with, for others you need to enable smtp. For testing and development you can disable the email verification, and then you can use any email to sign up.

6. Create a AuthFlow middleware of Supabase