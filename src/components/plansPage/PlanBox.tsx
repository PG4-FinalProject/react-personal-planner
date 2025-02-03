import styled from 'styled-components';
import IconButton from '../common/CheckBtn';
import LucideIcon from '../common/LucideIcon';

const PlanBoxStyle = styled.div`
  display: flex;
  height: 60px;
  margin: 6px 0px;
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

interface PlanBoxProps {}

function PlanBox({}: PlanBoxProps) {
  const handleDelete = () => {};

  return (
    <PlanBoxStyle>
      <PlanContent>
        <ColorDot />
        <div>
          <PlanTitle>팀 미팅</PlanTitle>
          <PlanTime>시간</PlanTime>
        </div>
      </PlanContent>
      <TrashBtn type="button" onClick={handleDelete}>
        <LucideIcon name="Trash2" size={20} />
      </TrashBtn>
    </PlanBoxStyle>
  );
}

export default PlanBox;
