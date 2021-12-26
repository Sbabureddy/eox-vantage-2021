import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatTime } from "../../utils/formatTime";
import { fetchNews, selectAllNews } from "./newsSlice";

const NewsLIst = () => {
  const news = useSelector(selectAllNews);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleChange = (e) => setQuery(e.target.value);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const filteredNews =
    query.length > 0 ? news?.filter((term) => term.TITLE.match(query)) : news;

  const renderNews = filteredNews?.map((news) => (
    <li key={news.ID}>
      <article>
        <h2>{news.TITLE}</h2>
        <h4>
          Publisher:
          <Link to={`/${news.PUBLISHER}`}>
            <button>{news.PUBLISHER}</button>
          </Link>
        </h4>
        <p>
          <time dateTime={news.TIMESTAMP}>{formatTime(news.TIMESTAMP)}</time>
        </p>
      </article>
    </li>
  ));

  return (
    <section>
      <h2>All News</h2>
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Search Based on  News Title"
      />
      <ul>{renderNews}</ul>
    </section>
  );
};

export default NewsLIst;
