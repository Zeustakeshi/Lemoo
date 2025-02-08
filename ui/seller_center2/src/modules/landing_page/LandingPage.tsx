import { Container, Button, Avatar, Paper } from "@mui/material";
import {
  ShoppingCart,
  Diamond,
  Watch,
  Instagram,
  Facebook,
  Twitter,
  ArrowForward,
  LocalOffer,
  Shield,
  CreditCard,
  Person,
} from "@mui/icons-material";
import { Link } from "@tanstack/react-router";

const LandingPage = () => {
  return (
    <div className="font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <Container className="py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="text-indigo-600" fontSize="large" />
            <span className="text-2xl font-bold text-gray-800">E-Shop</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="text-gray-600 hover:text-indigo-600">
              Home
            </a>
            <a href="#products" className="text-gray-600 hover:text-indigo-600">
              Products
            </a>
            <a
              href="#categories"
              className="text-gray-600 hover:text-indigo-600"
            >
              Categories
            </a>
            <a href="#contact" className="text-gray-600 hover:text-indigo-600">
              Contact
            </a>
          </div>
          <Button variant="outlined" startIcon={<Person />}>
            Login
          </Button>
        </Container>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-indigo-50 to-blue-50">
        <Container className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-6 text-gray-800">
              Discover Amazing Products at
              <span className="text-indigo-600"> Best Prices</span>
            </h1>
            <p className="text-gray-600 mb-8">
              Explore millions of products from various categories. Fast
              delivery and secure payment.
            </p>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Start Shopping
            </Button>
            <Link to="/" className="btn btn-primary">
              Vào hệ thống
            </Link>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://i.pinimg.com/736x/28/f1/a9/28f1a972e13e4281b5273891ead173eb.jpg"
              alt="Hero"
              className="rounded-lg shadow-xl"
            />
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Diamond />, title: "Jewelry" },
              { icon: <Watch />, title: "Watches" },
              { icon: <Diamond />, title: "Jewelry" },
              { icon: <Watch />, title: "Watches" },
            ].map((item, index) => (
              <Paper
                key={index}
                className="p-6 text-center hover:shadow-lg transition-shadow"
              >
                <Avatar className="bg-indigo-100 text-indigo-600 mb-4 mx-auto">
                  {item.icon}
                </Avatar>
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </Paper>
            ))}
          </div>
        </Container>
      </section>

      {/* Promotions Section */}
      <section className="bg-indigo-600 text-white py-16">
        <Container className="text-center">
          <h2 className="text-3xl font-bold mb-6">Biggest Sale of the Year!</h2>
          <div className="flex justify-center space-x-4 mb-8">
            <div className="bg-white text-indigo-600 p-4 rounded-lg">
              <div className="text-2xl font-bold">03</div>
              <div>Days</div>
            </div>
            <div className="bg-white text-indigo-600 p-4 rounded-lg">
              <div className="text-2xl font-bold">18</div>
              <div>Hours</div>
            </div>
            <div className="bg-white text-indigo-600 p-4 rounded-lg">
              <div className="text-2xl font-bold">45</div>
              <div>Minutes</div>
            </div>
          </div>
          <Button
            variant="contained"
            className="bg-white text-indigo-600 hover:bg-gray-100"
          >
            Shop Now
          </Button>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <Container className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <LocalOffer />,
              title: "Best Prices",
              text: "Price match guarantee",
            },
            {
              icon: <Shield />,
              title: "Secure Payments",
              text: "100% protected payments",
            },
            {
              icon: <CreditCard />,
              title: "Easy Returns",
              text: "30-day return policy",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Avatar className="bg-indigo-100 text-indigo-600">
                {item.icon}
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <Container className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <ShoppingCart className="text-white" />
              <span className="text-xl font-bold">E-Shop</span>
            </div>
            <p className="text-gray-400">
              Your trusted online shopping destination
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Careers</li>
              <li>Our Story</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Help Center</li>
              <li>Track Order</li>
              <li>Returns</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Instagram className="hover:text-indigo-400 cursor-pointer" />
              <Facebook className="hover:text-indigo-400 cursor-pointer" />
              <Twitter className="hover:text-indigo-400 cursor-pointer" />
            </div>
          </div>
        </Container>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          © 2024 E-Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
