to run this project

```shell
npm run dev
```

### Basics

#### components folder
components are stored in /src/components

later on we will have to plan for two types of components app wide and page specific


#### pages folder
holds views E.g Login
App.tsx is holding a router


### Notes

If using icons always make suer the license is correct

> Bartek - I think using this - https://icon-sets.iconify.design/ - is the best idea


### Documentation

## How to Run

### Option 1 - NodeJs: 
```bash
npm install
npm run dev
```

App runs at **http://localhost:5173**

### Option 2: Docker
```bash
docker-compose up --build
```

Same as if using node you access it by going to **http://localhost:5173** as it is running there.

## How to check if it is running

1. Open **http://localhost:5173** in browser.
2. You should see the home/landing page.
3. Check terminal, if there is no red errors than the app is running correctly (at least on the frontend side).

**If it is not working:**
- Check Terminal for errors and read them, usually missing dependencies
- Otherwise open browser DevTools (F12) or right click the page -> inspect -> console and check the errors.
 
## Key API Calls

All API calls use `apiFetch()` from `src/services/api.ts` which was created to help handle api calls. 

**Why?** 
For every call it: 
- Adds the JWT token to every request
- Sets correct headers
- Uses the API URL from `.env`

```typescript
import { apiFetch } from '../services/api';

// Example: GET
const res = await apiFetch('/api/meals/stats');
const data = await res.json();

// Example: POST
await apiFetch('/api/meals', {
  method: 'POST',
  body: JSON.stringify({ name: 'Lunch', calories: 600 })
});
```

## Watch Out For

### 1. Everything must be running
Since the project consists of 5 repositories co-existing toghterer to have full functionality of the application make sure to run every one of them otherwise, there will be API errors and some functionalities might not be accessible and the app might not work as intended. 

### 2. The `.env` File
```env
VITE_API_URL='http://localhost:5000'
```
- Must start with `VITE_` or Vite won't expose it
- If your backend runs on a diffrent port/host change the url.

### 3. Authentication Token
- Stored in `localStorage` as `token` and `user`
- If login breaks, clear localStorage: `localStorage.clear()` in browser console
- When token expires, the User gets redirected to login automatically

### 4. There are protected routes 
Routes like `/dashboard`, `/meals`, `/workout` are wrapped in `<ProtectedRoute>`. If the user is not logged in (no token), it is not possible for them to access these routes, if there is a try, you will get automatically redirected to login page.

### 5. Premium Features
Meals (`/meals`) and Hydration (`/hydration`) pages require a premium account (`user.type === 'premium'`), if the base user tries accessing them there is an automatic redirection.

### 6. Admin Routes
In order to access and navigate through admin panel and routes the user needs an admin account(`user.type === 'admin'`).


## Why Is the Code Structured This Way?

### `/src/components/` - Components are separated from pages.
All components are stored in this folder.
Separation from the pages allows them to be reused in diffrent pagaes.
Each component has its own folder consisting of a tsx and module.css file
Module.css allowed us to avoid style leaks between components.

### `/src/pages/` - Full views
Pages compose components togheter and display what you see under each url. Not including components toghether with pages makes them much easier to read and understand. 

### `/src/services/api.ts` - Single API layer
Having a single API layer allows changes to API URL or authentication logic to happen in one place while affecting every instance of it.

### `App.tsx` - All routes defined here
It puts apps structure in one place making it easier to see and understand.

### `i18n.ts` - All translations in one file
It makes it more convienent to add another language as its easy to structure in one file using i18n. 

### `ProtectedRoute` component
It allows to easily wrap the route that you want protected while reusing a one component making it much more convinient.

