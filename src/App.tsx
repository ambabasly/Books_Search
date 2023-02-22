import { Select, Spin } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { debounce } from "ts-debounce";
import Card from "antd/lib/card/Card";
import Skeleton from "react-loading-skeleton";
import coverImg from "./assets/cover_not_found.jpeg";
import "antd/dist/antd.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";

const { Option } = Select;

function App() {
  const [data, setData] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<any>({});
  const [choosen, setChoosen] = useState("");

  const handleSearch = debounce(async (newValue: string) => {
    if (newValue.length) {
      try {
        setFetching(true);

        const res = await axios.get(
          `http://openlibrary.org/search.json?title=${newValue}`
        );

        const { docs } = res.data;

        const newBooks = docs.slice(0, 20).map((item: any) => {
          const {
            key,
            author_name,
            cover_i,
            edition_count,
            first_publish_year,
            title,
          } = item;

          return {
            id: key,
            author: author_name,
            cover_id: cover_i,
            edition_count: edition_count,
            first_publish_year: first_publish_year,
            title: title,
          };
        });

        setData(newBooks);
      } catch (error) {
        setFetching(false);
        console.log(error);
      }
    } else {
      setData([]);
      setFetching(false);
    }
  }, 300);

  const handleChange = async (newValue: string) => {
    setChoosen(newValue);
    try {
      setLoading(true);

      const res = await axios.get(`http://openlibrary.org${newValue}.json`);

      const { data } = res;

      if (data) {
        const {
          description,
          title,
          covers,
          subject_places,
          subject_times,
          subjects,
        } = data;
        const newBook = {
          description: description ? description.value : "No description found",
          title: title,
          cover_img: covers
            ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
            : coverImg,
          subject_places: subject_places
            ? subject_places.join(", ")
            : "No subject places found",
          subject_times: subject_times
            ? subject_times.join(", ")
            : "No subject times found",
          subjects: subjects ? subjects.join(", ") : "No subjects found",
        };
        setDetails(newBook);
        setLoading(false);
      } else {
        setDetails(null);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const options = data.map((d) => (
    <Option key={d.id} value={d.id}>
      {d.title}
    </Option>
  ));

  return (
    <div className="App">
      <div className="input-holder">
        <Select
          placeholder="Search For Book"
          showSearch
          defaultActiveFirstOption={false}
          filterOption={false}
          onSearch={handleSearch}
          onChange={handleChange}
          notFoundContent={fetching ? <Spin size="small" /> : null}
        >
          {options}
        </Select>
      </div>

      {choosen.length > 0 ? (
        loading ? (
          <div className="skeletonloader">
            <Skeleton
              style={{
                height: "10rem",
                width: "20rem",
              }}
            />
          </div>
        ) : (
          <Card>
            <section className="book-details">
              <div className="container">
                <div className="book-details-content grid">
                  <div className="book-details-img">
                    <img src={details?.cover_img} alt="cover img" />
                  </div>
                  <div className="book-details-info">
                    <div className="book-details-item title">
                      <span className="fw-6 fs-24">{details?.title}</span>
                    </div>
                    <div className="book-details-item description">
                      <span>{details?.description}</span>
                    </div>
                    <div className="book-details-item">
                      <span className="fw-6">Subject Places: </span>
                      <span className="text-italic">
                        {details?.subject_places}
                      </span>
                    </div>
                    <div className="book-details-item">
                      <span className="fw-6">Subject Times: </span>
                      <span className="text-italic">
                        {details?.subject_times}
                      </span>
                    </div>
                    <div className="book-details-item">
                      <span className="fw-6">Subjects: </span>
                      <span>{details?.subjects}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Card>
        )
      ) : null}
    </div>
  );
}

export default App;
