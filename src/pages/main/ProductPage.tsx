import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productDetail, IProductDetail } from "../../lib/API/commonAPI";
import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
import { formatDollar } from "../../lib/Function/commonFn";
import MainProductBtn from "../../components/main/MainProductBtn";
import MainCartBtn from "../../components/main/MainCartBtn";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { check } from "../../lib/API/userAPI";
import { IProductLike } from "../../lib/API/adminAPI";
import MainBuyBtn from "../../components/main/MainBuyBtn";

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  let [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<IProductDetail>();
  const [like, setLike] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // 최초 LocalStorage에 접근하여, 찜 목록에 있는 상품의 like 값(true) 지정
  // 단일 상품 상세 조회
  useEffect(() => {
    async function fetchDetail() {
      try {
        const productRes = await productDetail(id as string);
        setProduct(productRes);

        // 인증
        const AuthRes = await check();
        // localStorage 접근
        const getLikeItem = localStorage.getItem(`like_${AuthRes.email}`);
        // parse를 위해 배열 선언
        let likeItems: IProductLike[] = [];

        // 파싱
        if (getLikeItem) {
          likeItems = JSON.parse(getLikeItem);
        }

        // useParams로 지정한 상품의 id값과 동일한 item을 찾아서 변수에 저장
        const item = likeItems.find((item) => item.id === id);

        // 찜 목록에 있다면 item.like(true), 없다면 false 지정
        const like = item ? item.like : false;

        // like state 변경
        setLike(like as boolean);
      } catch (error) {
        console.error(`error: ${error}`);
      }
    }
    fetchDetail();
  }, [id]);

  // 로컬 스토리지로 찜 여부가 포함된 상품 정보를 Post
  const onLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setLike((prevLike) => !prevLike); // like 토글
    const item = await findProduct(); // item 상세 조회

    if (item) postLike(item);

    setIsAnimating(true);

    // 0.4초 후에 resolve 함수를 호출하여 Promise를 완료
    await new Promise((resolve) => setTimeout(resolve, 400));

    setIsAnimating(false);
  };

  const findProduct = async () => {
    // 유효한 prdocut일 경우
    if (id) {
      // 단일 제품 상세 조회
      const product: IProductLike = await productDetail(id);
      return { ...product, like: true };
    }
    return null;
  };

  // 찜 목록을 로컬스토리지로 보냄
  const postLike = async (item: IProductLike) => {
    // 인증 확인
    const res = await check();
    // 일치하는 상품을 get
    const getLikeItem = localStorage.getItem(`like_${res.email}`);

    // 빈 배열 선언
    let likeItems: IProductLike[] = [];

    // 기존 찜 목록을 배열로 담음
    if (getLikeItem) {
      likeItems = JSON.parse(getLikeItem);
    }

    if (like === true) {
      // 이미 찜한 상품인 경우, 삭제(filter)
      const updatedLikes = likeItems.filter((value) => value.id !== item.id);
      localStorage.setItem(`like_${res.email}`, JSON.stringify(updatedLikes));
    } else {
      // 찜하지 않은 상품인 경우, 추가(push)
      likeItems.push(item);
      localStorage.setItem(`like_${res.email}`, JSON.stringify(likeItems));
    }
  };

  const discountedPrice =
    (product?.price as number) * (1 - (product?.discountRate as number) / 100);

  return (
    <Container>
      <PhotoWrapper>
        <img
          src={product ? product.photo : "/images/Detailed.png"}
          alt="Detailed"
        />
      </PhotoWrapper>
      <DetailWrapper>
        <TitleWrapper>
          <Title>{product?.title}</Title>
          <LikeButton
            onClick={onLike}
            selected={like}
            isAnimating={isAnimating}
          >
            {like ? <IoMdHeart /> : <IoMdHeartEmpty />}
          </LikeButton>
        </TitleWrapper>
        <Price>{formatDollar(discountedPrice)}</Price>
        <Desc>{product?.description}</Desc>
        <hr />
        <PurchaseWrapper>
          <Quantity>
            <span>구매 수량</span>
            <MainProductBtn quantity={quantity} setQuantity={setQuantity} />
          </Quantity>
          <PriceAll>
            <span>총 상품 금액</span>
            <Price>
              {product?.price ? formatDollar(discountedPrice * quantity) : 0}
            </Price>
          </PriceAll>
          <ButtonWrapper>
            <MainCartBtn quantity={quantity} />
            <MainBuyBtn quantity={quantity} />
          </ButtonWrapper>
        </PurchaseWrapper>
      </DetailWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const PhotoWrapper = styled.div`
  margin-right: 2rem;
`;

const DetailWrapper = styled.div`
  height: 100%;
  padding: 2rem 1rem;
  border: 1px solid ${theme.colors.gray[5]};
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
`;

const LikeButton = styled.button<{
  selected: boolean;
  isAnimating: boolean;
}>`
  background: none;
  border: none;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    css`
      color: ${theme.colors.pink};
    `}
  ${(props) =>
    props.isAnimating &&
    css`
      transform: scale(1.2);
      transition: 0.4s;
    `}

  > svg {
    font-size: 3rem;
  }
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const Desc = styled.div`
  line-height: 1.5rem;
  margin-bottom: 2rem;
  letter-spacing: 1.5%;
  color: ${theme.colors.gray[5]};
  margin-top: 2rem;
`;

const PurchaseWrapper = styled.div``;

const Quantity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  > span {
    font-size: 24px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;

  > Button {
    width: 170px;
    height: 50px;
    font-size: 18px;

    &:first-child {
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.orange.main};
      color: ${theme.colors.orange.main};
      cursor: pointer;
    }
  }
`;

const PriceAll = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  > span {
    font-size: 24px;
  }
`;

export default ProductPage;
