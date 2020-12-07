import React, { InputHTMLAttributes, useState, useCallback, useRef } from 'react';
import { IconBaseProps } from 'react-icons/lib';
import {Container} from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ComponentType<IconBaseProps>;
}

export const Input: React.FC<InputProps> = ({ icon: Icon, ...props}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    
    const handleInputFocus = useCallback(() => {
        setIsFocused(true)
    },[]);
    
    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        if (inputRef.current?.value) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    },[]);

    return (
    <Container isFilled={isFilled} isFocused={isFocused}>
        {Icon && <Icon size={20} />}
        <input 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...props} />
    </Container>
    )
   
};

export default Input;