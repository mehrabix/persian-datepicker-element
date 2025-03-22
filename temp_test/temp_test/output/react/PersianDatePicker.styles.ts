import styled from 'styled-components';

interface ContainerProps {
  rtl?: boolean;
  primaryColor?: string;
  theme?: 'light' | 'dark';
}

// Main container for the component
export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 100%;
  font-family: 'Vazirmatn', 'Tahoma', Arial, sans-serif;
  direction: ${props => props.rtl ? 'rtl' : 'ltr'};

  // Theme variables
  --primary-color: ${props => props.primaryColor || '#3b82f6'};
  --background-color: ${props => props.theme === 'dark' ? '#1e293b' : '#ffffff'};
  --text-color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#0f172a'};
  --border-color: ${props => props.theme === 'dark' ? '#475569' : '#e2e8f0'};
  --hover-color: ${props => props.theme === 'dark' ? '#334155' : '#f1f5f9'};
  --border-radius: 0.375rem;
`;

// Wrapper for the web component to apply styled-components styles
export const WebComponentWrapper = styled.div`
  width: 100%;
  
  // Apply styles to the web component shadow DOM elements via CSS variables
  & > * {
    --primary-color: var(--primary-color);
    --background-color: var(--background-color);
    --text-color: var(--text-color);
    --border-color: var(--border-color);
    --hover-color: var(--hover-color);
    width: 100%;
  }
`;

// Legacy styled components for reference
export const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--background-color);
  color: var(--text-color);
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 1px var(--primary-color);
  }
`;

export const CalendarPopup = styled.div<{ rtl?: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  ${props => props.rtl ? 'right: 0;' : 'left: 0;'}
  width: 300px;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
`;

export const Header = styled.div<{ primaryColor?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: ${props => props.primaryColor || 'var(--primary-color)'};
  color: white;

  button {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

export const WeekdayHeader = styled.div`
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-color);
  opacity: 0.7;
  padding: 6px 0;
`;

interface DayButtonProps {
  selected?: boolean;
  today?: boolean;
  primaryColor?: string;
}

export const DayButton = styled.div<DayButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 50%;
  margin: 2px;
  ${props => props.today && `
    font-weight: bold;
    border: 1px solid ${props.primaryColor || 'var(--primary-color)'};
  `}
  
  ${props => props.selected && `
    background: ${props.primaryColor || 'var(--primary-color)'};
    color: white;
  `}
  
  &:hover {
    background: ${props => props.selected ? props.primaryColor || 'var(--primary-color)' : 'var(--hover-color)'};
    color: ${props => props.selected ? 'white' : 'var(--text-color)'};
  }
`; 