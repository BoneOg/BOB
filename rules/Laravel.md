**PHP/Laravel**
- Use PHP 8.2+ features when appropriate. Do not use outdated or deprecated PHP features.
- Utilize Laravel's built-in features and helpers when possible.
- File structure: Follow Laravel's 12.x+ directory structure and naming conventions.
- Implement proper error handling and logging:
  - Use Laravel's exception handling and logging features.
  - Create custom exceptions when necessary.
  - Use try-catch blocks for expected exceptions.
- Use Laravel's validation features for form and request validation.
- Implement middleware for request filtering and modification.
- Utilize Laravel's Eloquent ORM for database interactions.
- Use Laravel's query builder for complex database queries.
- Implement proper database migrations and seeders.
- Use Eloquent ORM instead of raw SQL queries when possible.
- Follow Laravel's MVC architecture.
- Implement proper CSRF protection and security measures.
- Sanitize user inputs when necessary, especially before processing inputs with the server.

**Laravel Service Providers**
- There are no other service providers except AppServiceProvider. Don't create new service providers unless absolutely necessary. Use Laravel 11-12+ new features, instead. Or, if you really need to create a new service provider, register it in `bootstrap/providers.php` and not `config/app.php` like it used to be before Laravel 11.

**Laravel Event Listeners**
- Since Laravel 11, Listeners auto-listen for the events if they are type-hinted correctly.

**Laravel Console Scheduler**
- Scheduled commands should be in `routes/console.php` and not `app/Console/Kernel.php` which doesn't exist since Laravel 11 and we use Laravel 12+.

**Laravel Middleware**
- Should be registered in `bootstrap/app.php` and not `app/Http/Kernel.php` which doesn't exist since Laravel 11 and we use Laravel 12+.

**Laravel Tailwind**
- In new React pages, use Tailwind and not Bootstrap. Tailwind is already pre-configured since Laravel 11, with Vite.

**Laravel Routes & Web.php**
- `web.php` exists because Laravel 12 ships with only `routes/web.php` because, since Laravel v11, the framework treats an API as an opt-in feature: you create it only if you truly need a stateless JSON interface. All Inertia-driven pages (and any other UI that relies on cookies, sessions, and CSRF protection) should continue to live in `web.php` under the web middleware group. If, however, you must expose a public or mobile API that is stateless, needs to serve external clients, rate-limited, and/or authenticated with tokens, then enabling the separate `routes/api.php` might make sense. Truly evaluate where you are putting routes and do not create a disjointed cosebase under the `/routes` directory.
- Routes should not be created in TypeScript/Javascript/React directories.

**Rebuilding Assets**
- Tell the user to run `composer run dev` to rebuild assets instead of `npm run dev`

**Laravel + React + Inertia**
- Do not over-bloat react components, overloading a component with functions and other logic is a sign that things need to broken out into separate files and imported into the component so that it is not hundreds of lines long (be mindful of a component that exceeds 200 lines of code because it might be time to abstract things out of it, this is not a general rule but a note of caution).
- Be mindful of how the Laravel backend is going to connect to the React/Inertia frontend when adding new features, API calls, etc...
- Do not place Inertia form logic directly in the render body.
- React components must delegate API requests, side effects, and Inertia actions to separate hooks or utils.
- When fetching data for a page, prefer Laravel controller + Inertia::render() over `useEffect` in React, unless it makes sense to use `useEffect` like in cases of socket connections, live updates, client-interactivity, frequent fetching/polling, etc... SSR needs to be conisdered so we do not stress the server and drive up cost.
- Avoid React routes or routing logic, always define routes in Laravel and pass via Inertia.
- Avoid using localStorage/sessionStorage in components rendered via Inertia SSR.
- Wrap any browser-only code in guards to avoid SSR mismatches.
- Use `useForm()` from `@inertiajs/react` for any form state management to keep forms Inertia-aware and leverage validation.
- Avoid axios/fetch inside components unless explicitly creating non-Inertia background logic
- Avoid importing JS libraries that contradict the Laravel framework and Laravel project best practices, or JS libraries that conflict with existing Laravel implementations.
- Use `<Link>` from `@inertiajs/react` instead of `<a>` for internal navigation to preserve SPA behavior.
- Be mindful of what data is being exposed to each page via Inertia + Laravel, do not expose sensitive data to the front-end because of shared Inerta props.
- For React ensure to name components, hooks, and lib/utils in a hyphen format like `firstword-secondword.tsx`.
- Create .tsx instead of .ts when adding components and hooks.

**Common Paths to Help With Codebase Searches**
- Laravel controllers are under `/app/Http/Controllers/*`
- Laravel middlware are under `/app/Http/Middleware/*`
- Laravel models are under `/app/Models/*`
- Laravel policies are under `/app/Policies/*`
- Laravel App Service Provider `/app/Providers/AppServiceProvider.php`
- Database Schema `/database/migrations/*`
- React Content (Hooks, lib, layouts, pages, components, etc.) `/resources/js/*` | `/resources/js/components/*` | `/resources/js/pages/*` | `/resources/js/layouts/*` | `/resources/js/hooks/*` 
- Typescript types `/resources/js/types/*`
- Routes `/routes/*`
- Try to look around these directories before adding new files because you do NOT want to duplicate existing files/functionality.

**Codebase Structure**
- Do not look for routing under `/resources/js/` because routing lives in `/routes/*` since this is a Laravel application and not a javascript/typescript application.

**Project / Context**
- PHP ^8.2 || ^8.4
- PEST testing framework
- Laravel 12+
- React
- Typescript
- Lucide React Icons
- Tailwind
- Inertia (for React)
- MySQL Database
- Shadcn/ui Components
