import styled from "styled-components";
import './_variables.scss';

export const darkGray = getComputedStyle(document.documentElement).getPropertyValue('--dark-gray');

export const Header = styled.header`
min-height: 35vh;
background-image: url(pattern-bg-mobile.png);
background-position: center;
background-repeat: no-repeat;
background-size: cover;

    @media (min-width: 376px) {
        background-image: url(pattern-bg-desktop.png);
    }
`

export const Title = styled.h1`
    font-size: 28px;
    color: #fff;
    text-align: center;
    margin: 0;
    font-weight: 500;
    padding: 1rem 0;
`
export const FormGroup = styled.div`
    display: flex;
    justify-content: center;
    height: 50px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`
export const Input = styled.input`
    width: 70vw;
    max-width: 500px;
    border-radius: 12px 0 0 12px;
    border: none;
    padding: 1rem;
    font-weight: 500;
    color: hsl(0, 0%, 17%);
    font-weight: 400;
    position: relative;
`
export const Button = styled.button`
    width: 10vw;
    max-width: 60px;
    background: #000;
    color: #fff;
    border-radius: 0px 12px 12px 0px;
    &:hover {
        filter: brightness(1.75);
    }
`
export const Main = styled.main`
    position: relative;
`
export const Container = styled.div`
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80vw;
    max-width: 80%;
    background: #fff;
    border-radius: 12px;
    padding: 1rem;
    z-index: 999;
    text-align: center;
    
    @media (min-width: 576px) {
        flex-direction: row;
        padding: 1.6rem;
        text-align: start;
    }
`
export const InfoBlock = styled.div`
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;

    h4 {
        text-transform: uppercase;
        color: darkGray;
        font-size: 10px;
        margin-bottom: 6px;
        letter-spacing: 1.4px;
    }

    h3 {
        color: hsl(0, 0%, 17%);
        font-size: 18px;
    }

    @media (min-width: 576px) {
        margin-bottom: 0; 

        h4 {
            font-size: 12px;
        }

        h3 {
            font-size: 20px;
            max-width: 120px;
        }
    }

    @media (min-width: 768px) {
        &:not(:last-child)::after {
            content: '';
            width: 1px;
            height: 50px;
            background: lightgray;
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
`