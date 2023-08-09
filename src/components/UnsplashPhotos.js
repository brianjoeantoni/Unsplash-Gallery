import React, { useState, useEffect } from "react";
import FullPhoto from "./FullPhoto";
import axios from "axios";

const SearchField = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex gap-10">
      <input
        className="bg-gray-50 border border-gray-300 text-sm w-full
        p-2.5 outline-none focus:border-blue-500 focus:ring-2 
        rounded-full"
        type="search"
        placeholder="Search Anything..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="bg-blue-600 px-6 py-2.5 text-white rounded-full
        focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

const UnsplashPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    const collectionId = "2423569";
    const apiKey = "FZpIl7feLseFHwV4DScQqiaVULO54C7GRBiqlmDrxdI";

    let apiUrl = `https://api.unsplash.com/collections/${collectionId}/photos?per_page=15&page=${page}`;
    if (searchQuery) {
      apiUrl = `https://api.unsplash.com/search/photos?page=${page}&per_page=15&query=${searchQuery}`;
    }

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Client-ID ${apiKey}`,
        },
      })
      .then((response) => {
        const fetchedPhotos = response.data.results || response.data;

        if (page === 1) {
          setPhotos(fetchedPhotos);
        } else {
          setPhotos((prevPhotos) => [...prevPhotos, ...fetchedPhotos]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchQuery, page]);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };
  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1); // Reset page when search
  };

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !loading) {
      setPage((prevPage) => prevPage + 1);
      setLoading(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="px-32 py-20">
        <SearchField onSearch={handleSearch} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 my-10">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-gray-100 p-2.5 rounded-lg"
              onClick={() => openModal(photo)}
            >
              <img
                className="h-full w-full object-cover rounded-lg shadow-md cursor-pointer"
                src={photo.urls.regular}
                alt={photo.description}
              />
            </div>
          ))}
          {loading && <div>Loading more photos...</div>}{" "}
          {/* Loading indicator */}
        </div>
      </div>
      <FullPhoto
        isOpen={selectedPhoto !== null}
        onClose={closeModal}
        imageUrl={selectedPhoto ? selectedPhoto.urls.full : ""}
        altText={selectedPhoto ? selectedPhoto.description : ""}
      />
    </>
  );
};

export default UnsplashPhotos;
