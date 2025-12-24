const output = document.getElementById('output');
const userInputSpan = document.getElementById('user-input');
const animationToggle = document.getElementById('animation-toggle');
const toggleOn = document.getElementById('toggle-on');
const toggleOff = document.getElementById('toggle-off');
const toggleLabel = document.querySelector('.toggle-label');

// Load preference from localStorage
let skipAnimationPref = localStorage.getItem('skipAnimation') === 'true';

function updateToggleUI() {
    if (!toggleOn || !toggleOff || !toggleLabel) return;
    if (skipAnimationPref) {
        toggleOn.style.display = 'none';
        toggleOff.style.display = 'block';
        toggleLabel.textContent = 'Typing Animation: Off';
    } else {
        toggleOn.style.display = 'block';
        toggleOff.style.display = 'none';
        toggleLabel.textContent = 'Typing Animation: On';
    }
}

updateToggleUI();

let lineIndex = 0;
let charIndex = 0;
let isTyping = true;
let consoleTextToClear = [];
let terminalLines = [];
let terminalAsciiArt = [];
let terminalInitialLines = [];

let terminalConfig = null;

async function loadConfig() {
    try {
        const response = await fetch('config.json');
        terminalConfig = await response.json();
        return terminalConfig;
    } catch (error) {
        console.error('Failed to load config:', error);
        return null;
    }
}

async function initTerminal(pageKey) {
    const config = await loadConfig();
    if (!config) return;

    // Set site title if available
    if (config.siteTitle && pageKey === 'home') {
        document.title = config.siteTitle;
    }

    let initial = [];
    let ascii = [];
    let menu = [];

    if (pageKey === 'home') {
        initial = config.pages.home.initialLines;
        ascii = config.asciiArt;
        menu = [
            " ",
            " ",
            " ",
            ...config.menu.map((item, index) => `${index + 1}. ${item.label}`),
            " ",
            config.pages.home.promptText.replace('{{menuLength}}', config.menu.length),
            " "
        ];
    } else if (config.pages[pageKey]) {
        initial = config.pages[pageKey].initialLines;
        ascii = [];
        menu = config.pages[pageKey].content;
        if (config.pages[pageKey].title) {
            document.title = config.pages[pageKey].title;
        }
    }

    terminalInitialLines = initial;
    terminalAsciiArt = ascii;
    terminalLines = [...initial, ...ascii, ...menu];
    
    if (skipAnimationPref) {
        showAllInstantly();
    } else {
        typeLine();
    }
}

function showAllInstantly() {
    output.innerHTML = '';
    terminalLines.forEach((line, index) => {
        const isAscii = index >= terminalInitialLines.length && index < terminalInitialLines.length + terminalAsciiArt.length;
        const el = document.createElement(isAscii ? 'pre' : 'p');
        el.id = `line-${index}`;
        el.textContent = line;
        output.appendChild(el);
    });
    isTyping = false;
    lineIndex = terminalLines.length; // Ensure typeLine loop stops
    const container = document.querySelector('.terminal-output');
    if (container) container.scrollTop = container.scrollHeight;
    console.log('Animation skipped. Content loaded instantly.');
}

function typeLine() {
    if (!isTyping) return; // Stop typing if interrupted

    if (lineIndex < terminalLines.length) {
        if (!terminalLines[lineIndex]) {
            lineIndex++;
            setTimeout(typeLine, 0);
            return;
        }
        if (charIndex === 0) {
            const isAscii = lineIndex >= terminalInitialLines.length && lineIndex < terminalInitialLines.length + terminalAsciiArt.length;
            const p = document.createElement(isAscii ? 'pre' : 'p');
            p.id = `line-${lineIndex}`;
            output.appendChild(p);
        }
        const currentLine = document.getElementById(`line-${lineIndex}`);
        if (currentLine) {
            currentLine.textContent += terminalLines[lineIndex][charIndex];
            charIndex++;
        } else {
            lineIndex++;
            charIndex = 0;
            setTimeout(typeLine, 0);
            return;
        }

        const container = document.querySelector('.terminal-output');
        if (container) container.scrollTop = container.scrollHeight;

        if (charIndex < terminalLines[lineIndex].length) {
            const isAscii = lineIndex >= terminalInitialLines.length && lineIndex < terminalInitialLines.length + terminalAsciiArt.length;
            setTimeout(typeLine, isAscii ? 5 : 30);
        } else {
            lineIndex++;
            charIndex = 0;
            setTimeout(typeLine, 150);
        }
    } else {
        isTyping = false;
        console.log('Typing finished. Input enabled.');
    }
}

window.addEventListener('keydown', (e) => {
    if (isTyping) return;

    if (['Enter', 'Backspace', ' '].includes(e.key)) {
        e.preventDefault();
    }

    console.log(`Key pressed: ${e.key}`);

    if (e.key === 'Enter') {
        const command = userInputSpan.textContent.trim();
        userInputSpan.textContent = '';
        
        handleCommand(command);
        
    } else if (e.key === 'Backspace') {
        userInputSpan.textContent = userInputSpan.textContent.slice(0, -1);
    } else if (e.key.length === 1) {
        userInputSpan.textContent += e.key;
    }
    
    const container = document.querySelector('.terminal-output');
    if (container) container.scrollTop = container.scrollHeight;
});

function handleDefaultCommands(command) {
    if (command.toUpperCase() === 'CLEAR') {
        clearConsole();
        return true;
    }
    
    if (terminalConfig && terminalConfig.menu) {
        const index = parseInt(command) - 1;
        if (!isNaN(index) && index >= 0 && index < terminalConfig.menu.length) {
            const item = terminalConfig.menu[index];
            if (item.type === 'external') {
                window.open(item.url, '_blank').focus();
                writeToConsole(`> Opening ${item.label} in a new tab . . .`);
            } else {
                window.location.href = item.url;
            }
            return true;
        }
    }

    return false;
}

function handleInvalidInput(command) {
    // Handle invalid input
    console.warn(`Invalid option entered: "${command}"`);
    writeToConsole(`> ${command}`);
    writeToConsole("Invalid option. Please try again.");
}

function clearConsole() {
    consoleTextToClear.forEach(p => output.removeChild(p));
    consoleTextToClear = [];
}

function writeToConsole(string) {
    const p = document.createElement('p');
    p.textContent = `${string}`;
    output.appendChild(p);
    userInputSpan.textContent = '';
    consoleTextToClear.push(p);
}

if (animationToggle) {
    animationToggle.addEventListener('click', () => {
        skipAnimationPref = !skipAnimationPref;
        localStorage.setItem('skipAnimation', skipAnimationPref);
        updateToggleUI();
        
        // If animations are now off and we are currently typing, finish instantly
        if (skipAnimationPref && isTyping) {
            showAllInstantly();
        }
    });
}
