import styled from 'styled-components';
import IconButton from '../common/CheckBtn';
import LucideIcon from '../common/LucideIcon';
import { PlanI } from '../../types/plan.type';

const PlanBoxStyle = styled.div`
  display: flex;
  height: 60px;
  margin: 8px 0px;
  padding: 12px;
  border-radius: 8px;
  background-color: #f9fafb;
  align-items: center;
  justify-content: space-between;
`;

const TrashBtn = styled.button`
  height: 100%;
  padding: 8px;
  background-color: #f9fafb;
  border: 1px solid red;
`;

const PlanContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ColorDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: black;
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
}

function PlanBox({ plan }: PlanBoxProps) {
  const handleDelete = () => {};

  return (
    <PlanBoxStyle>
      <PlanContent>
        <ColorDot />
        <div>
          <PlanTitle>{plan.title}</PlanTitle>
          <PlanTime>{plan.startTime}</PlanTime>
        </div>
      </PlanContent>
      <TrashBtn type="button" onClick={handleDelete}>
        <LucideIcon name="Trash2" size={20} />
      </TrashBtn>
    </PlanBoxStyle>
  );
}

export default PlanBox;
