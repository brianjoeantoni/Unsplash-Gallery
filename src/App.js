//run cmd "yarn start"
import UnsplashPhotos from "./components/UnsplashPhotos";

function App() {
  // const { response, isLoading, error, fetchData } = useAxios(
  //   `search/photos?page=1&query=office&client_id=${process.env.REACT_APP_ACCESS_KEY}`
  // );

  return (
    <>
      <UnsplashPhotos />
    </>
  );
}

export default App;
