import Tag from "./Tag";
import styled from "styled-components";
import Banner from "../main/MainBanner";
import { theme } from "../../styles/theme";

const tags = [
  { key: 0, tag: "ALL" },
  { key: 1, tag: "#태양계 부동산" },
  { key: 2, tag: "#사건의 지평선" },
  { key: 3, tag: "#우주복" },
  { key: 4, tag: "#우주 식량" },
  { key: 5, tag: "#우주선" },
  { key: 6, tag: "#특가 상품" },
];

interface ISubHeaderProps {
  clickedTag: string;
  clickTagHandler: (tag: string) => void;
}

// Tag 컴포넌트의 selected에 선택 여부를 boolean으로 전달
// 태그가 선택됐거나, 검색창에 검색어를 입력 시, Banner를 출력하지 않는다.
function SubHeader({ clickedTag, clickTagHandler }: ISubHeaderProps) {
  return (
    <>
      <TagContainer>
        <TagBG>
          <TagWrapper>
            {tags.map((value) => (
              <Tag
                key={value.key}
                selected={value.tag === clickedTag}
                onClick={() => clickTagHandler(value.tag)}
              >
                {value.tag}
              </Tag>
            ))}
          </TagWrapper>
        </TagBG>
      </TagContainer>
      {clickedTag.length > 0 ? "" : <Banner />}
    </>
  );
}

const TagContainer = styled.div`
  width: 100%;
  display: flex;
  height: 7.5rem;
  justify-content: center;
  background: linear-gradient(
    ${theme.colors.orange.main},
    ${theme.colors.orange.linear}
  );
`;

const TagBG = styled.div`
  width: 100%;
  display: flex;
  background-size: auto;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-image: url("/images/TagMenuImage.svg");
`;

const TagWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  width: 1088px;
  max-width: 1088px;
  align-items: center;
  justify-content: space-between;
  > div {
  }
`;

export default SubHeader;
