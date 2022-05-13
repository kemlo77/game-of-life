import './style.css';
import { reverseText } from './reverse';

function myFunction(): void {
    const inputElement: HTMLInputElement = (document.getElementById('textInput') as HTMLInputElement);
    const inputText: string = inputElement.value;
    const reversedText: string = reverseText(inputText);
    inputElement.value = reversedText;
}

document.getElementById('reverseButton').addEventListener('click', () => myFunction());