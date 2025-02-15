import styled from 'styled-components';

const PlanDateRadioBtnStyle = styled.div<{
  $isChecked?: boolean;
}>`
  display: flex;
  height: 34px;
  justify-content: center;
  align-items: center;
  background-color: ${({ $isChecked }) => ($isChecked ? '#3578FF' : '#e5e7eb')};
  border: 1px solid #e5e7eb;
  border-radius: 4px;

  input[type='radio'] {
    appearance: none;
  }

  label {
    font-weight: bold;
    color: #4b5563;
    margin: 0px 6px 0px 0px;
  }

  input:checked + label {
    color: #ffffff;
  }
`;

interface PlanDateRadioBtnProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
}

const PlanDateRadioBtn = ({ name, value, ...props }: PlanDateRadioBtnProps) => {
  const isChecked = name === value;

  return (
    <PlanDateRadioBtnStyle $isChecked={isChecked}>
      <input type="radio" id={name} name="planDate" value={name} {...props} />
      <label htmlFor={name}>{name}</label>
    </PlanDateRadioBtnStyle>
  );
};

export default PlanDateRadioBtn;
