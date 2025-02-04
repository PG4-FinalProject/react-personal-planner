import React from 'react';
import {
  TagsGroup,
  TagButton,
  Label,
  InputGroup,
} from '../../styles/CreatePlans.styles';
import { TAGS } from '../../pages/CreatePlans/constants';

interface TagSelectorProps {
  selectedTagId: number;
  onSelect: (id: number) => void;
}

export const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTagId,
  onSelect,
}) => {
  return (
    <InputGroup>
      <Label>태그 선택</Label>
      <TagsGroup>
        {TAGS.map(tag => (
          <TagButton
            key={tag.id}
            type="button"
            isSelected={selectedTagId === tag.id}
            onClick={() => onSelect(tag.id)}
            style={{
              backgroundColor:
                selectedTagId === tag.id ? tag.color : 'transparent',
              color: selectedTagId === tag.id ? 'white' : 'black',
            }}
          >
            {tag.name}
          </TagButton>
        ))}
      </TagsGroup>
    </InputGroup>
  );
};
