# Seller Center 2

## Introduction

Seller Center 2 is a platform designed to empower sellers with the tools they need to manage and grow their online businesses. This application provides a comprehensive suite of features to streamline operations, enhance sales, and improve customer satisfaction.

## Features

- **Dashboard:** Get an overview of your sales performance, key metrics, and important notifications.
- **Product Management:** Easily add, edit, and organize your products with detailed descriptions, images, and pricing.
- **Order Management:** Track and fulfill orders efficiently, manage shipping, and handle returns.
- **Inventory Management:** Keep track of your stock levels, set up alerts for low inventory, and manage product variations.
- **Marketing Tools:** Utilize various marketing tools to promote your products, create promotions, and engage with customers.
- **Analytics:** Gain insights into your sales trends, customer behavior, and product performance with detailed analytics and reports.
- **Store Management**: Manage store information, including name, logo, and status ([`Store`](src/common/type/store.type.ts)).
- **Product Variants**: Create and manage product variants, such as sizes and colors, with individual SKUs, pricing, and inventory ([`SkusVar`](src/common/type/formAddProduct.ts)).
- **Category Management**: Organize products into categories for better discoverability and customer experience. Implemented using [`CategoryMenu`](src/modules/product/category/CategoryMenu.tsx).
- **Media Management**: Upload and manage product images and other media files.

## Technologies Used

- **Frontend:** React, TypeScript, Material UI, TanStack Router, React Hook Form
- **Backend:** (Not specified in the provided files, but typically Node.js, Python, Java, etc.)
- **API Communication:** Axios
- **State Management:** React Context, TanStack Query
- **Form Handling:** React Hook Form, Zod for schema validation
- **Styling:** CSS, Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (version >= 16)
- npm or yarn

### Installation

1.  Clone the repository:

    ```sh
    git clone <repository-url>
    ```

2.  Navigate to the project directory:

    ```sh
    cd seller_center2
    ```

3.  Install dependencies:

    ```sh
    npm install
    ```

    or

    ```sh
    yarn install
    ```

### Development

1.  Start the development server:

    ```sh
    npm run dev
    ```

    This will start the application at `http://seller.lemoo.com:5174`.

### Building for Production

1.  Build the application:

    ```sh
    npm run build
    ```

    This will create an optimized build in the `dist` directory.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Implement your changes.
4.  Write tests to ensure your changes are working correctly.
5.  Submit a pull request.

## License

[License] (https://opensource.org/licenses/MIT)
