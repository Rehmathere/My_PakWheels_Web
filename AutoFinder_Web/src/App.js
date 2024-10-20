import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Navbar from "./components/navbar/navbar";
import FreeAd from "./pages/service/freeAd/freeAd";
import UsedCarPostAd from "./pages/usedCar/postAd/postAd";
import PostAd_ListitForyou from "./pages/usedCar/postAd/postAd_ListitForyou";
import { useEffect } from "react";
import useRehydrateUser from "./hooks/user/rehydrateUser"
import SelectPaymentMethod from "./pages/selectPaymentMethod/selectPaymentMethod";
import Bike_selectPayment from "./pages/selectPaymentMethod/bike_selectPayment";
import VerifyPayment from "./pages/verifyPayment/verifyPayment";
import Bike_VerifyPayment from "./pages/verifyPayment/bike_verifyPayment";
import UsedCarBuyNow from "./pages/usedCar/buyNow/buyNow";
import CarDetail from "./pages/usedCar/carDetail/carDetail";
import CarInspection from "./pages/service/carInspection/carInspection";
import ServiceRequest from "./pages/serviceRequest/serviceRequest";
import ListItForYou from "./pages/service/listItForYou/listItForYou";
import BuyCarForMe from "./pages/service/buyCarForMe/buyCarForMe";
import UserProfile from "./pages/user/userProfile/userProfile";
import User from "./pages/user/user";
import UserAds from "./pages/user/userAds/userAds";
import UserPackage from "./pages/user/userPackage/userPackage";
import CarRental from "./pages/service/carRental/carRental"
import CarRentalPostAd from "./pages/carRental/carRentalPostAd/carRentalPostAd";
import CarRentalList from "./pages/carRental/carRentalList/carRentalList";
import CarRentalSingleAd from "./pages/carRental/carRentalSingleAd/carRentalSingleAd";
import DealerPackages from "./pages/packages/dealerPackages/dealerPackages";
import Footer from "./components/footer/footer";
import FavoriteAds from "./pages/user/favoritesAds/favoriteAds";
import Blogs from "./pages/blogs/blogs";
import OneBlog from "./pages/blogs/oneBlog/oneBlog";
import Videos from "./pages/videos/videos";
import Bikes from "./pages/bikes/bikes";
import PostBikeAd from "./pages/bikes/used/postBikeAd/postBikeAd";
import BuyBikes from "./pages/bikes/used/buyBikes/buyBIkes";
import Auto_Part from "./pages/AutoParts/Auto_Parts";
import Post_AutoPartAd from "./pages/AutoParts/Post_AutoPart_Ad/Post_AutoPartAd";
import BuyBikes_Detail from "./pages/bikes/used/buyBikes/BuyBikes_Detail";
import Buy_Auto_PartAd from "./pages/AutoParts/Buy_Auto_Part_Ad/Buy_Auto_PartAd";
import Buy_Auto_PartAd_Detail from "./pages/AutoParts/Buy_Auto_Part_Ad/Buy_Auto_PartAd_Detail";
import Bike_dealerPackages from "./pages/packages/dealerPackages/bike_dealerPackages";
import My_NewCars from "./pages/NewCars/My_NewCars";
import My_NewCarsDetail from "./pages/NewCars/My_NewCarsDetail";
import My_FindNewCars from "./pages/NewCars/My_FindNewCars";
import My_NewCarsDetail_2 from "./pages/NewCars/My_NewCarsDetail_2";
import Compare from "./pages/NewCars/Compare";
import My_Request from "./pages/user/myRequest/My_Request";
import UsedCarPostAd_2 from "./pages/usedCar/postAd/postAd_2";

function App() {
  // const {user , dispatch} = useContext(UserContext)
  const {rehydrateUser} = useRehydrateUser()
  useEffect(() => {
    rehydrateUser()
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="Whole-Container">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* //service  */}
            <Route path="/service/free-ad" element={<FreeAd />} />
            <Route path="/service/car-inspection" element={<CarInspection/>}/>
            <Route path="/service/list-it-for-you" element={<ListItForYou/>}/>
            <Route path="/service/buy-car-for-me" element={<BuyCarForMe/>} />
            <Route path="/service/car-rental" element={<CarRental/>} />
            {/* // Car Rental Rouotes */}
            <Route path="/service/car-rental/post-ad" element={<CarRentalPostAd/>}></Route>
            <Route path="/service/car-rental/listings" element={<CarRentalList/>} ></Route>
            <Route path="/service/car-rental/listings/:id" element={<CarRentalSingleAd/>} />
            {/* // service request */}
            <Route path="/service/request" element={<ServiceRequest/>} />
            {/* //Used car */}
            <Route path="/used-car/post-ad" element={<UsedCarPostAd />} />
            <Route path="/used-car/post-ad_2" element={<UsedCarPostAd_2 />} />
            {/* --- New --- */}
            <Route path="/PostAd_ListitForyou" element={<PostAd_ListitForyou />} />
            {/* --- New --- */}
            <Route path="/used-car/buy" element={<UsedCarBuyNow/>}/>
            <Route path="/used-car/detail/:id" element={<CarDetail/>}/>
            {/* // Pacakges */}
            <Route path="/packages/dealer" element={<DealerPackages/>}></Route>
            {/* --- Bike Dealer Package --- */}
            <Route path="/packages/Bike_dealerPackages" element={<Bike_dealerPackages/>}></Route>
            {/* --- Bike Dealer Package --- */}
            {/* Payments*/}
            <Route path="/select-payment-method" element={<SelectPaymentMethod/>}/>
            {/* --- Bike Select Payment Method --- */}
            <Route path="/Bike_selectPayment" element={<Bike_selectPayment/>}/>
            {/* --- Bike Select Payment Method --- */}
            {/* --- Bike Verify Payment  --- */}
            <Route path="/verify-payment" element={<VerifyPayment/>} />
            {/* --- Bike Verify Payment  --- */}
            <Route path="/Bike_VerifyPayment" element={<Bike_VerifyPayment/>} />
            {/* --- Bike Verify Payment  --- */}
            {/* --- New Cars  --- */}
            <Route path="/My_NewCars" element={<My_NewCars/>} />
            <Route path="/My_FindNewCars" element={<My_FindNewCars/>} />
            <Route path="/My_NewCarsDetail" element={<My_NewCarsDetail/>} />
            <Route path="/My_NewCarsDetail_2/:id" element={<My_NewCarsDetail_2/>} />
            <Route path="/Compare" element={<Compare/>} />
            {/* --- New Cars  --- */}
            {/* User Profile */}
            <Route path="/user" element={<User/>}>
              <Route path="profile" element={<UserProfile/>} />
              <Route path="ads" element={<UserAds/>} />
              <Route path="package" element={<UserPackage/>} />
              <Route path="favorite" element={<FavoriteAds/>}/>
              {/* New My Request */}
              <Route path="My_Request" element={<My_Request/>}/>
            </Route>
            {/* // Blogs */}
            <Route path="/blogs" element={<Blogs/>}/>
            <Route path="/blogs/:id" element={<OneBlog/>}/>
            {/* // Videos */}
            <Route path="/videos" element={<Videos/>}/>
            {/* // BIKES */}
            <Route path="/bikes" element={<Bikes/>} />
            <Route path="/bikes/used/postAd" element={<PostBikeAd/>} ></Route>
            <Route path="/bikes/used/buy" element={<BuyBikes/>}></Route>
            {/* Bike Detail */}
            <Route path="/BuyBikes_Detail/:id" element={<BuyBikes_Detail/>}></Route>
            {/* Auto Parts */}
            <Route path="/Auto_Part" element={<Auto_Part/>} />
            <Route path="/Post_AutoPartAd" element={<Post_AutoPartAd/>} ></Route>
            <Route path="/Buy_Auto_PartAd" element={<Buy_Auto_PartAd/>} ></Route>
            <Route path="/Buy_Auto_PartAd_Detail/:id" element={<Buy_Auto_PartAd_Detail/>} ></Route>
          </Routes>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
