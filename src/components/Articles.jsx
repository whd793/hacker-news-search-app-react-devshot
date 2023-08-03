import { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputval, setInputval] = useState("");
  const [pages, setPages] = useState(0);
  const [totalpages, setTotalpages] = useState(0);
  const [query, setQuery] = useState("");
  const handlesubmit = (e) => {
    e.preventDefault();
    setPages(0);
    setQuery(inputval);
    // console.log("clicked");
  };

  const fetchdata = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://hn.algolia.com/api/v1/search?", {
        params: { page: pages, query: query }
      });
      const { hits, nbPages } = res.data;
      console.log(res.data);
      setArticles(hits);
      setTotalpages(nbPages);
      console.log(nbPages);
      console.log("total= " + totalpages);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handlechange = (e) => {
    setInputval(e.target.value);
    // fetchdata();
  };

  useEffect(() => {
    fetchdata();
    // console.log(data);
  }, [query]);
  return (
    <div className="articles">
      <form className="articles__form" onSubmit={handlesubmit}>
        <input
          className="articles__input"
          type="text"
          placeholder="search for articles"
          onChange={handlechange}
          value={inputval}
        />
        <button type="submit" className="articles__btn">
          {" "}
          Submit{" "}
        </button>
      </form>
      {loading ? (
        <span className="articles__article--title">Loading...</span>
      ) : (
        articles &&
        articles.map((n, i) => {
          if (!n.title) return;
          // console.log(n.title);

          return (
            <div className="articles__article">
              <span className="articles__article--title">{n.title} </span>
              <a className="articles__article--url" href={n.url}>
                {" "}
                {n.url}{" "}
              </a>
              <span className="articles__article--createdat">
                {" "}
                {n.created_at}{" "}
              </span>
            </div>
          );
        })
      )}

      {/* {[...new Array(totalpages)].map((n, i) => {
        return (
          <div>
            <div>{i + 1} </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default Articles;
