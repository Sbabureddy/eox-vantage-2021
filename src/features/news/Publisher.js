import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatTime } from "../../utils/formatTime";
import { selectAllNews } from "./newsSlice";

const Publisher = () => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => setQuery(e.target.value);

  const { newsId } = useParams();
  const news = useSelector(selectAllNews);

  const publishersList =
    query.length > 0
      ? news
          ?.filter((news) => news.PUBLISHER === newsId)
          ?.filter((term) => term.TITLE.match(query))
          .slice()
          .sort((a, b) => b.TIMESTAMP - a.TIMESTAMP)
      : news
          ?.filter((news) => news.PUBLISHER === newsId)
          .slice()
          .sort((a, b) => b.TIMESTAMP - a.TIMESTAMP);
  return (
    <section className="App">
      <h2>Publisher</h2>
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Search Based on  News Title"
      />
      <ul>
        {publishersList?.map((publisher) => (
          <li key={publisher.ID}>
            <article>
              <h2>{publisher.TITLE}</h2>
              <h4>{publisher.PUBLISHER}</h4>
              <p>Published on -{formatTime(publisher.TIMESTAMP)}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Publisher;
