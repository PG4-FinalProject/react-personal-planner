import styled from 'styled-components';

interface PlanDateRadioBtnProps {
  children: React.ReactNode;
  value: string;
  name: string;
  defaultChecked?: boolean | undefined;
  disabled?: boolean | undefined;
}

const PlanDateRadioBtnStyle = styled.label`
  input[type='radio'] {
    appearance: none;
  }

  border-radius: 4px;
  padding: 4px 12px;
  background-color: #e5e7eb;

  box-sizing: border-box;
  border: 1px solid #e5e7eb;
`;

function PlanDateRadioBtn({
  children,
  value,
  name,
  defaultChecked,
  disabled,
}: PlanDateRadioBtnProps) {
  return (
    <PlanDateRadioBtnStyle>
      <input
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      {children}
    </PlanDateRadioBtnStyle>
  );
}

export default PlanDateRadioBtn;
