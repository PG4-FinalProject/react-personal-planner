import styled from 'styled-components';
import LucideIcon from '../common/LucideIcon';
import { PlanI } from '../../types/plan.type';
import { useAlert } from '../../hooks/useAlert';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const PlanBoxStyle = styled.div`
  display: flex;
  height: 68px;
  margin: 8px 0px;
  padding: 12px;
  border-radius: 8px;
  background-color: #f9fafb;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #eff6ff;
  }
`;

const TrashBtn = styled.button`
  height: 100%;
  padding: 8px;
  background-color: #f9fafb;
  border: none;
`;

const PlanContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ColorDot = styled.div<{
  $bgColor: string;
}>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor || 'black'};
`;

const PlanTitle = styled.div`
  font-weight: bold;
`;

const PlanTime = styled.div`
  font-size: 14px;
  color: #91929f;
`;

interface PlanBoxProps {
  plan: PlanI;
  deletePlan: (planId: number) => void;
}

const PlanBox = ({ plan, deletePlan }: PlanBoxProps) => {
  const { showConfirm } = useAlert();

  const navigate = useNavigate();

  const startTime = dayjs(plan.startTime).format('HH:mm');
  const endTime = dayjs(plan.endTime).format('HH:mm');

  const handlePlanClick = () => {
    navigate('/plans/edit', { state: plan });
  };

  const handleDelete = () => {
    showConfirm('정말 삭제하시겠습니까?', () => {
      deletePlan(plan.id);
    });
  };

  return (
    <PlanBoxStyle onClick={handlePlanClick}>
      <PlanContent>
        <ColorDot $bgColor={plan.color} />
        <div>
          <PlanTitle>{plan.title}</PlanTitle>
          <PlanTime>
            {startTime} - {endTime}
          </PlanTime>
        </div>
      </PlanContent>
      <TrashBtn type="button" onClick={handleDelete}>
        <LucideIcon name="Trash2" size={20} />
      </TrashBtn>
    </PlanBoxStyle>
  );
};

export default PlanBox;
