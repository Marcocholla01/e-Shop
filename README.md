# ShopO E-Commerce Platform

Welcome to ShopO, a multi-vendor e-commerce platform that caters to administrators, sellers, and customers. ShopO offers a comprehensive suite of features to facilitate seamless transactions and interactions between various stakeholders.

## Table of Contents

- [Overview](#overview)
- [Demo](#demo)
- [Screen Shots of the System](#screen-shots)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Overview

![ShopO Logo](/client/src/assets/images/svg/logo.svg)

ShopO is a comprehensive multi-vendor e-commerce platform designed to provide a seamless shopping experience for users while offering powerful management tools for administrators and sellers. Built with the latest technologies, ShopO facilitates secure transactions, efficient order management, and customizable user experiences.

### Key Features

- **Multi-Vendor Support**: ShopO accommodates multiple sellers, allowing them to create their stores and manage their inventory.
- **User-Friendly Interface**: The platform boasts an intuitive interface that enhances user navigation and shopping convenience.
- **Secure Payments**: ShopO integrates robust payment gateways to ensure safe and secure transactions for buyers and sellers.
- **Customizable Dashboard**: Sellers and administrators have access to customizable dashboards tailored to their specific needs.
- **Comprehensive Management Tools**: From product management to order fulfillment, ShopO provides comprehensive tools to streamline operations.
- **Scalable Architecture**: Built on scalable architecture, ShopO can accommodate growth and handle increased traffic seamlessly.
- **Responsive Design**: ShopO is optimized for various devices, offering a consistent user experience across desktops, tablets, and smartphones.
- **Community Engagement**: ShopO fosters community engagement through user reviews, ratings, and interactive features.

With its robust features and user-centric design, ShopO aims to revolutionize the e-commerce landscape, empowering sellers to grow their businesses and providing customers with a delightful shopping experience.

## Demo

Click this link to view a Live Demo of the website [Live Demo](https://shop0-bice.vercel.app/) <!-- Add your live demo link -->

## Screen Shots

Here are some of the screenshot of how the website looks like

#### 1. Home Page

![Home Page](/client/src/assets/images/shopScreenShots/homepage.png)

#### 2. Seller Dashboard

![Seller Dashboard](/client/src/assets/images/shopScreenShots/sellerDashboard.png) <!-- Add a screenshot of your portfolio -->

#### 3. Admin Dashboard

![Admin Dashboard](/client/src/assets/images/shopScreenShots/AdminDashboard.png) <!-- Add a screenshot of your portfolio -->

#### 4.Products Page

![products page img](/client/src/assets/images/shopScreenShots/AdminDashbard.png) <!-- Add a screenshot of your portfolio -->

#### 5. Invoice

![Invoice img](/client/src/assets/images/shopScreenShots/invoice.png) <!-- Add a screenshot of your portfolio -->

#### 6. Withdrawal Details

![withdrawal details](/client/src/assets/images/shopScreenShots/withdrawalinfo.png) <!-- Add a screenshot of your portfolio -->

#### 7. Footer

![footerimg](/client/src/assets/images/shopScreenShots/footer.png) <!-- Add a screenshot of your portfolio -->

## Features

### For Customers

- **Product Browsing**: Customers can explore a diverse range of products offered by different sellers.
- **Shopping Cart**: Users can add products to their cart and proceed to checkout for payment.
- **Secure Payments**: ShopO ensures secure payment processing for customer transactions.
- **Order Tracking**: Customers can track the status of their orders from purchase to delivery.
- **User Authentication**: Customers can create accounts, log in, and manage their profiles.
- **Reviews and Ratings**: Customers can leave reviews and ratings for products and sellers.

### For Sellers

- **Seller Dashboard**: Sellers have access to a dashboard where they can manage their products, orders, and transactions.
- **Product Management**: Sellers can add new products, update existing ones, and remove products from their inventory.
- **Order Management**: Sellers can view and fulfill orders placed by customers.
- **Earnings Tracking**: Sellers can track their earnings and view transaction histories.
- **Communication**: Sellers can communicate with customers regarding orders and product inquiries.

### For Administrators

- **Admin Dashboard**: Administrators have access to a centralized dashboard for managing the entire platform.
- **User Management**: Administrators can manage user accounts, roles, and permissions.
- **Seller Verification**: Administrators can verify seller accounts and monitor seller activities.
- **Analytics and Reporting**: Administrators can generate reports and analyze key metrics related to sales, user activity, and more.
- **Platform Customization**: Administrators can customize the platform's settings, themes, and configurations.

## Technologies Used

- **React.js**: Frontend development
- **Node.js**: Backend development
- **Express.js**: Backend framework
- **MongoDB**: Database management
- **Tailwind CSS**: Frontend styling
- **JWT Authentication**: User authentication and authorization
- **Stripe API** & **PayPal**: Payment processing

## Installation

To set up the ShopO e-commerce platform locally on your machine, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Marcocholla01/e-Shop
```

2. Navigate to the project directory

```bash
cd e-shop
```

_Now in this directory you will find Three other directories_

### Server Folder

- Steps followed

1.  Navigate to server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm i
```

3. Create a _`dotenv` file_ inside the **config folder**, copy the content in the _`.env.example` file_ and the required secrets

4. Start the development server:

```bash
npm run dev
```

### Socket Folder

- Steps followed

1.  Navigate to socket directory:

```bash
cd socket
```

2. Install dependencies:

```bash
npm i
```

3. Start the development server:

```bash
npm run dev
```

### Client Folder

- Steps followed

1.  Navigate to client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm i -force
```

3. Start the development server:

```bash
npm run dev
```

4. Access the platform in your browser at http://localhost:1001

## Usage

#### Once the platform is up and running, users can:

- **Customers**: Browse products, add items to their cart, make purchases, and track orders.
- **Sellers**: Manage their product listings, fulfill orders, and communicate with customers.
- **Administrators**: Monitor platform activity, manage users and sellers, and customize platform settings.

## Configuration

There is no configurations on this project

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Create a pull request.

## License

This project is licensed under the [MIT License](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt).
