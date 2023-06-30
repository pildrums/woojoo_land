import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { check } from "../../lib/API/userAPI";
import { IProduct } from "../../lib/API/adminAPI";
import MainCartListBtn from "./MainCartListBtn";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useDispatch } from "react-redux";
import { setQuantity } from "../../modules/cartItem";
import Button from "../common/Button";
import { BsCheckLg } from "react-icons/bs";

interface IsetisChecked {
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
}

function MainCartList({ isChecked, setIsChecked }: IsetisChecked) {
  const dispatch = useDispatch();
  const [carts, setCarts] = useState<IProduct[]>([]);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [isDeleted, setIsDeleted] = useState(false);

  // 로컬 스토리지 내 장바구니 목록 조회 및 장바구니 내 상품 정보 dispatch
  useEffect(() => {
    getCart();
    handleCheck();
  });

  const getCart = async () => {
    // 인증 확인
    const res = await check();
    // 로컬스토리지에서 장바구니 목록 GET
    const getCartItems = localStorage.getItem(`cart_${res.email}`);
    const prevCartItems = JSON.stringify(carts);

    // 장바구니 내 상품이 있다면
    if (getCartItems && getCartItems !== prevCartItems) {
      // JSON 파싱
      const cartItems: IProduct[] = JSON.parse(getCartItems);

      // carts state Update
      setCarts(cartItems);

      // 수량 계산
      const amount: { [title: string]: number } = {}; // 객체 생성
      cartItems.forEach((item) => {
        // item 객체의 title 속성을 변수에 할당
        const { title } = item;
        // amount 객체에 해당 title 속성이 존재하는 지에 따라 수량 할당
        amount[title as string]
          ? (amount[title as string] += 1)
          : (amount[title as string] = 1);
      });

      // 수량에 맞게 state에 dispatch
      Object.entries(amount).forEach(([title, quantity]) => {
        // [key, value] - [title, quantity]
        const cartItem = cartItems.find((item) => item.title === title);
        if (cartItem) {
          const { id } = cartItem;
          dispatch(
            setQuantity({
              productId: id as string,
              title: title as string,
              quantity: quantity,
              price: cartItems.find((item) => item.title === title)?.price || 0,
              discountRate: 0,
            }),
          );
        }
      });
    } else if (!prevCartItems) {
      // 상품이 없는 경우 빈 배열
      setCarts([]);
    }
  };

  // new Set 메소드로 중복을 제거하고, 상품의 id만 추출한 배열 선언
  // 추후에, 기존의 carts와 비교(filtering)하여 상품의 개수를 계산
  const settedCart = Array.isArray(carts)
    ? Array.from(new Set(carts.map((cart) => cart.id)))
    : [];

  // 선택된 상품의 일괄 삭제
  const deleteChecked = async () => {
    if (checkedIds.length) {
      const confirm = window.confirm("선택한 상품을 삭제하시겠습니까?");
      if (confirm) {
        const updatedCarts = carts.filter(
          (cart) => !checkedIds.includes(cart.id as string),
        );
        const res = await check();
        localStorage.setItem(`cart_${res.email}`, JSON.stringify(updatedCarts));
      }
      window.location.reload();
      getCart();
    }
  };

  // check 여부를 확인 후 해당 상품의 id를 checkedIds 배열에 저장
  const onCheck = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { checked } = event.target;
    if (checked) {
      setCheckedIds((prev) => [...prev, id]);
    } else {
      setCheckedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleCheck = () => {
    if (checkedIds.length) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  return (
    <Ul>
      {carts.length
        ? settedCart.map((id, index) => {
            const sortedCart = carts.filter((cart) => cart.id === id);
            const quantity = sortedCart.length;
            const cart = sortedCart[0];

            return (
              <li key={index}>
                <div>
                  <input
                    id={cart.id}
                    type="checkbox"
                    onChange={(event) => {
                      onCheck(event, cart.id as string);
                    }}
                  />
                  <CheckCircle htmlFor={cart.id}>
                    <BsCheckLg className="checkLg" size="1.3rem" />
                  </CheckCircle>
                </div>
                <img src={cart.thumbnail} alt="Thumbnail" width="100px" />
                <Title>{cart.title}</Title>
                <MainCartListBtn
                  id={cart.id}
                  quantity={quantity}
                  price={cart.price as number}
                  title={cart.title}
                  setIsDeleted={setIsDeleted}
                />
              </li>
            );
          })
        : "장바구니에 상품이 없습니다."}
      {carts.length ? (
        <SelectDelete
          disabled={!isChecked}
          type="button"
          onClick={deleteChecked}
          orange
        >
          선택 삭제
        </SelectDelete>
      ) : (
        ""
      )}
    </Ul>
  );
}

const Ul = styled.ul`
  gap: 20px;
  display: flex;
  list-style: none;
  flex-direction: column;

  > li {
    padding: 0 2rem;
    justify-content: space-between;
    width: 100%;
    height: 120px;
    display: flex;
    margin-bottom: 16px;
    align-items: center;
    border-radius: 5px;
    border: 1px solid ${theme.colors.gray[3]};

    input {
      display: none;
    }

    label {
      cursor: pointer;
    }

    .checkLg {
      color: ${theme.colors.gray[3]};
    }

    input:checked + label {
      background-color: ${theme.colors.orange.main};

      .checkLg {
        color: ${theme.colors.white};
      }
    }
    > img {
      border-radius: 5px;
    }
  }
`;

const CheckCircle = styled.label`
  width: 1.6rem;
  display: flex;
  height: 1.6rem;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.colors.gray[3]};
`;

const SelectDelete = styled(Button)`
  width: 5rem;
  height: 2.5rem;
  align-self: end;
  font-weight: 700;

  &:hover {
    background-color: ${(props) => props.theme.colors.orange.hover};
  }
`;

const Title = styled.div`
  min-width: 275px;
  width: 275px;
`;

export default MainCartList;
