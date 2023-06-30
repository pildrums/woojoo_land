import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// common
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

// admin
import AdminPage from "./pages/admin/AdminPage";
import ProductsPage from "./pages/admin/ProductsPage";
import HistoryPage from "./pages/admin/HistroyPage";
import UserListPage from "./pages/admin/UserListPage";

// auth
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// user
import UserPage from "./pages/user";
import LikePage from "./pages/user/LikePage";
import AccountPage from "./pages/user/AccountPage";
import SettingPage from "./pages/user/SettingPage";

// main
import MainPage from "./pages/main/MainPage";
import ProductPage from "./pages/main/ProductPage";
import CartPage from "./pages/main/CartPage";
import PaymentPage from "./pages/main/PaymentPage";
import AllPage from "./pages/main/tagged/AllPage";
import SolarPage from "./pages/main/tagged/SolarPage";
import OnSalePage from "./pages/main/tagged/OnSalePage";
import FoodPage from "./pages/main/tagged/FoodPage";
import ShipPage from "./pages/main/tagged/ShipPage";
import SuitPage from "./pages/main/tagged/SuitPage";
import HorizonPage from "./pages/main/tagged/HorizonPage";
import DashboardPage from "./pages/admin/DashboardPage";

function App() {
  const [username, setUsername] = useState("");
  const [inputText, setInputText] = useState("");
  const [clickedTag, setClickedTag] = useState("");

  useEffect(() => {
    localStorage.getItem("username");
    console.log(localStorage.getItem("username"));
  }, []);

  // Tag 선택 여부 관리
  const clickTagHandler = (tag: string) => {
    setClickedTag((value) => (value === tag ? "" : tag));
  };

  // 검색어 state 관리
  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  return (
    <BrowserRouter>
      <Main>
        <Header
          username={username}
          setUsername={setUsername}
          clickedTag={clickedTag}
          inputText={inputText}
          clickTagHandler={clickTagHandler}
          searchHandler={searchHandler}
        />
        {/* <Loading /> */}
        <Inner>
          <Routes>
            {/* 메인 */
            /* 선택된 태그와, 검색어에 따라 조건부 라우팅 */}
            <Route
              path="/"
              element={
                clickedTag === "ALL" ? (
                  <AllPage />
                ) : clickedTag === "#태양계 부동산" ? (
                  <SolarPage />
                ) : clickedTag === "#특가 상품" ? (
                  <OnSalePage />
                ) : clickedTag === "#우주복" ? (
                  <SuitPage />
                ) : clickedTag === "#우주 식량" ? (
                  <FoodPage />
                ) : clickedTag === "#우주선" ? (
                  <ShipPage />
                ) : clickedTag === "#사건의 지평선" ? (
                  <HorizonPage />
                ) : (
                  <MainPage />
                )
              }
            />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/payment"
              element={
                <PaymentPage username={username} setUsername={setUsername} />
              }
            />

            {/* 관리자 페이지 */}
            <Route path="/admin" element={<AdminPage />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="userlist" element={<UserListPage />} />
            </Route>
            {/* Auth 페이지 */}
            <Route
              path="/auth/login"
              element={<LoginPage setUsername={setUsername} />}
            />
            <Route
              path="/auth/register"
              element={<RegisterPage setUsername={setUsername} />}
            />
            {/* 유저 페이지 */}
            <Route path="/user" element={<UserPage />}>
              <Route path="account" element={<AccountPage />} />
              <Route path="like" element={<LikePage />} />
              <Route path="settings" element={<SettingPage />} />
            </Route>
          </Routes>
        </Inner>
        <Footer />
      </Main>
    </BrowserRouter>
  );
}

const Main = styled.main`
  width: 100%;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Inner = styled.div`
  width: 75rem;
  flex-grow: 1;
  max-width: 75rem;
  margin: 3.5rem auto 0rem;
`;

export default App;
