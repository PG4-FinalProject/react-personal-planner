import styled from 'styled-components';
import ContentUIBox from '../layout/ContentUIBox';
import { palette } from '../../styles/palette';
import PlanDateRadioBtn from './PlanDateRadioBtn';
import { useState } from 'react';
import { PlanDateType } from '../../types/plan.type';
import PlanBox from './PlanBox';
import { usePlans } from '../../hooks/usePlans';

const PlanDateBtnsFieldset = styled.fieldset`
  display: flex;
  width: fit-content;
  height: fit-content;
  background-color: #e5e7eb;
  border: none;
  border-radius: 4px;
`;

const PlanDateBox = styled.div`
  display: flex;
  padding: 16px 8px 0px;
  gap: 20px;
  align-items: center;
`;

const PlanDateTitle = styled.div`
  font-weight: bold;
  color: #4b5563;
`;

const PlansCount = styled.div`
  font-size: 14px;
  color: #91929f;
`;

interface PlansBoxProps {}

function PlansBox({}: PlansBoxProps) {
  const { plans } = usePlans();

  const [planDate, setPlanDate] = useState<PlanDateType>('오늘');

  const handlePlanDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlanDate(e.target.value as PlanDateType);
  };

  return (
    <ContentUIBox bgColor={palette.white}>
      <PlanDateBtnsFieldset>
        <PlanDateRadioBtn
          name="오늘"
          value={planDate}
          onChange={handlePlanDate}
          defaultChecked
        />
        <PlanDateRadioBtn
          name="예정"
          value={planDate}
          onChange={handlePlanDate}
        />
        <PlanDateRadioBtn
          name="완료"
          value={planDate}
          onChange={handlePlanDate}
        />
      </PlanDateBtnsFieldset>
      <PlanDateBox>
        <PlanDateTitle>오늘</PlanDateTitle>
        <PlansCount>3개의 할 일</PlansCount>
      </PlanDateBox>
      {plans.map(plan => (
        <PlanBox plan={plan} />
      ))}
    </ContentUIBox>
  );
}

export default PlansBox;
