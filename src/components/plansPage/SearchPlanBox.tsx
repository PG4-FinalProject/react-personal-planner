import styled from 'styled-components';
import ContentUIBox from '../layout/ContentUIBox';
import { palette } from '../../styles/palette';
import LucideIcon from '../common/LucideIcon';

interface SearchPlanBoxProps {}

const SearchPlanBoxStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SearchPlanSpan = styled.span`
  font-size: 18px;
  color: #4b5563;
`;

const SearchPlanBox = ({}: SearchPlanBoxProps) => {
  return (
    <ContentUIBox bgColor={palette.white}>
      <SearchPlanBoxStyle>
        <LucideIcon name="Search" size={30} />
        <SearchPlanSpan>할 일 검색</SearchPlanSpan>
      </SearchPlanBoxStyle>
    </ContentUIBox>
  );
};

export default SearchPlanBox;
