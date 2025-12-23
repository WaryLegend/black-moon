# Black & Moon (Clothes E-commerce Website)

A modern e-commerce platform for clothing, built with Next.js and Tailwind CSS. Features include user authentication, product management, shopping cart, wishlist, admin dashboard, and more.

## Features

- User registration and login
- Product browsing and filtering
- Shopping cart and checkout
- Wishlist functionality
- Admin panel for managing products, categories, users, and inventory
- Responsive design with dark mode support
- Real-time chat bot
- Product reviews and ratings

## Technologies Used

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Icons:** React Icons
- **Forms:** React Hook Form
- **Animations:** Framer Motion
- **Notifications:** React Hot Toast
- **Date Handling:** date-fns and date-fns-tz
- **Color Utilities:** colord
- **Select Components:** react-select
- **Counters:** react-countup

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd black-moon
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install additional packages:

   ```bash
   npm i zustand react-select react-hot-toast react-icons react-hook-form colord framer-motion date-fns date-fns-tz react-countup
   ```

4. Set up environment variables (create a `.env.local` file):
   - Add necessary API keys, database URLs, etc.

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Visit the homepage to browse products.
- Register or log in to access user features like cart and wishlist.
- Admins can access the admin panel at `/admin` for management tasks.

## Project Structure

- `app/`: Next.js app directory with pages and components
- `_components/`: Reusable UI components
- `_context/`: State management stores
- `_data/`: Sample data
- `_hooks/`: Custom React hooks
- `_lib/`: Utility libraries
- `_styles/`: Global styles
- `_utils/`: Helper functions
- `public/`: Static assets

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License.
