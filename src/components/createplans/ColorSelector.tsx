// import React from 'react';
// import {
//   ColorGroup,
//   ColorRadio,
//   Label,
//   InputGroup,
// } from '../../styles/CreatePlans.styles';

// export const COLORS = ['#FF4B4B', '#FFB800', '#00C43B', '#4B7BFF', '#A355FF'];

// interface ColorSelectorProps {
//   selectedColor: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// export const ColorSelector: React.FC<ColorSelectorProps> = ({
//   selectedColor,
//   onChange,
// }) => {
//   return (
//     <InputGroup>
//       <Label>색상 선택</Label>
//       <ColorGroup>
//         {COLORS.map(color => (
//           <ColorRadio
//             key={color}
//             type="radio"
//             name="color"
//             value={color}
//             checked={selectedColor === color}
//             onChange={onChange}
//             style={{ backgroundColor: color }}
//           />
//         ))}
//       </ColorGroup>
//     </InputGroup>
//   );
// };
