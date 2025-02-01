import styled from 'styled-components';
import ContentUIBox from '../layout/ContentUIBox';
import { palette } from '../../styles/palette';

interface SearchPlanBoxProps {}

const SearchPlanBoxStyle = styled.div``;

function SearchPlanBox({}: SearchPlanBoxProps) {
  return (
    <ContentUIBox bgColor={palette.white}>
      <SearchPlanBoxStyle>
        <h1>할일 페이지</h1>
        <p>여기에 할일 관련 콘텐츠를 추가하세요.</p>
        {/* 할일 컴포넌트나 기능을 여기에 추가할 수 있습니다. */}
      </SearchPlanBoxStyle>
    </ContentUIBox>
  );
}

export default SearchPlanBox;
