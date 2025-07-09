import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
      {/* ✅ Global Toast Container */}
  <Toaster />
    </>
  );
};

export default Layout;
