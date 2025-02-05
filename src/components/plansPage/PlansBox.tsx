import styled from 'styled-components';
import ContentUIBox from '../layout/ContentUIBox';
import { palette } from '../../styles/palette';
import PlanDateRadioBtn from './PlanDateRadioBtn';
import { useEffect, useState } from 'react';
import { PlanDateType } from '../../types/plan.type';
import PlanBox from './PlanBox';
import { usePlan } from '../../hooks/usePlan';
import { useSearchParams } from 'react-router-dom';
import { addDateToday, getDateFormat } from '../../utils/date';

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

const PlansBox = ({}: PlansBoxProps) => {
  const { plans, deletePlan } = usePlan();

  const [searchParams, setSearchParams] = useSearchParams();
  const [planDate, setPlanDate] = useState<PlanDateType>('오늘');

  const handlePlanDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const planDate = e.target.value;
    setPlanDate(planDate as PlanDateType);
    const newSearchParams = new URLSearchParams(searchParams);
    switch (planDate) {
      case '오늘':
        newSearchParams.delete('startDate');
        newSearchParams.delete('endDate');
        break;
      case '예정':
        newSearchParams.set('startDate', getDateFormat(addDateToday(1)));
        newSearchParams.set('endDate', getDateFormat(addDateToday(3)));
        break;
      case '완료':
        newSearchParams.set('startDate', getDateFormat(addDateToday(-1)));
        newSearchParams.set('endDate', getDateFormat(addDateToday(-1)));
        break;
    }
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    setPlanDate('오늘');
  }, []);

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
        <PlanDateTitle>{planDate}</PlanDateTitle>
        <PlansCount>{plans.length}개의 할 일</PlansCount>
      </PlanDateBox>
      {plans.map(plan => (
        <PlanBox key={plan.id} plan={plan} deletePlan={deletePlan} />
      ))}
    </ContentUIBox>
  );
};

export default PlansBox;
