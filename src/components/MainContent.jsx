import ProductPage from "./ProductPage";
import WeatherAPI from "./WeatherAPI";

function MainContent({ activePage, products, setProducts }){
    if (activePage === "products") {
        return (
          <main className="main-content">
            <ProductPage products={products} setProducts={setProducts} />
          </main>
        );
    }
        if (activePage === "WeatherAPI") {
        return (
          <main className="main-content">
            <WeatherAPI/>
          </main>
        );
    }
    return <main className="main-content"></main>;
}
export default MainContent;