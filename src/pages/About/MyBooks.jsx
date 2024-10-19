// import BooksPage from "../../components/BooksPage/BooksPage";
import MyBooksPage from "../../components/MyBooksPage/MyBooksPage";
import "./About.css";
// import aboutImg from "../../images/about-img.jpg";

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <MyBooksPage />

        {/* <BooksPage /> */}
      </div>
    </section>
  );
};

export default About;
