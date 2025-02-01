import styled from 'styled-components';
import ContentUIBox from '../layout/ContentUIBox';
import { palette } from '../../styles/palette';
import PlanDateRadioBtn from './PlanDateRadioBtn';

interface PlansBoxProps {}

const PlansBoxStyle = styled.div``;

const PlanDateBtnsFieldset = styled.fieldset`
  width: fit-content;
  background-color: #e5e7eb;
  display: flex;
  border: none;
`;

function PlansBox({}: PlansBoxProps) {
  return (
    <ContentUIBox bgColor={palette.white}>
      <PlansBoxStyle>
        <PlanDateBtnsFieldset>
          <PlanDateRadioBtn value="today" name="planDate" defaultChecked>
            오늘
          </PlanDateRadioBtn>
          <PlanDateRadioBtn value="toDo" name="planDate">
            예정
          </PlanDateRadioBtn>
          <PlanDateRadioBtn value="completed" name="planDate">
            완료
          </PlanDateRadioBtn>
        </PlanDateBtnsFieldset>
        <p>오늘</p>
        <p>팀미팅</p>
      </PlansBoxStyle>
    </ContentUIBox>
  );
}

export default PlansBox;
