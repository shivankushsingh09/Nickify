document.addEventListener('DOMContentLoaded', () => {
    const baseNameInput = document.getElementById('baseName');
    const styleSelector = document.getElementById('styleSelector');
    const generateBtn = document.getElementById('generateBtn');
    const resultsGrid = document.getElementById('resultsGrid');
    const chips = styleSelector.querySelectorAll('button');

    let currentStyle = 'random';

    // Data for generating names
    const prefixes = {
        gamer: ['Xgod', 'Pro', 'Cyber', 'Neon', 'Shadow', 'Ghost', 'Viper', 'Nova', 'Elite', 'Rogue'],
        cool: ['The', 'Mr', 'Captain', 'Agent', 'Doctor', 'Master', 'Lord', 'King', 'Prince', 'Duke'],
        funny: ['Silly', 'Lazy', 'Happy', 'Grumpy', 'Cheeky', 'Bouncy', 'Fluffy', 'Wobbly', 'Dizzy', 'Crazy'],
        aesthetic: ['Moon', 'Star', 'Cloud', 'Soft', 'Dream', 'Rose', 'Silk', 'Velvet', 'Crystal', 'Angel']
    };

    const suffixes = {
        gamer: ['Slayer', 'Hunter', 'Sniper', 'Killer', 'Warrior', 'Knight', 'Assassin', 'Gamer', 'Player', 'Master'],
        cool: ['Guy', 'Man', 'Boy', 'Dude', 'Bro', 'Boss', 'Chief', 'Legend', 'Hero', 'Champ'],
        funny: ['Pants', 'Face', 'Head', 'Nose', 'Toes', 'Bottom', 'Knees', 'Elbows', 'Hands', 'Feet'],
        aesthetic: ['Light', 'Dust', 'Mist', 'Rain', 'Sky', 'Garden', 'Flower', 'Leaf', 'Petal', 'Bloom']
    };

    // Style selection
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentStyle = chip.dataset.style;

            // Generate immediately or on next click? User preference usually click.
            // Let's add a visual feedback
            generateBtn.classList.add('pulse');
            setTimeout(() => generateBtn.classList.remove('pulse'), 500);
        });
    });

    // Generate names
    generateBtn.addEventListener('click', () => {
        const base = baseNameInput.value.trim();
        if (!base) {
            // Shake animation for empty input
            baseNameInput.classList.add('shake');
            setTimeout(() => baseNameInput.classList.remove('shake'), 500);
            return;
        }

        generateNicknames(base, currentStyle);
    });

    // Also generate on Enter key in input
    baseNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });

    function generateNicknames(base, style) {
        resultsGrid.innerHTML = '';
        const names = [];

        // Logic to generate 8-12 variations
        for (let i = 0; i < 12; i++) {
            names.push(createName(base, style));
        }

        // Display results with staggered animation
        names.forEach((name, index) => {
            const card = document.createElement('div');
            card.className = 'result-card';
            card.style.animationDelay = `${index * 0.05}s`;
            card.innerHTML = `
                <div class="nickname">${name}</div>
                <div class="copy-hint">Click to Copy</div>
            `;

            card.addEventListener('click', () => {
                copyToClipboard(name, card);
            });

            resultsGrid.appendChild(card);
        });
    }

    function createName(base, style) {
        let name = base;
        let selectedStyle = style;

        if (style === 'random') {
            const styles = ['gamer', 'cool', 'funny', 'aesthetic'];
            selectedStyle = styles[Math.floor(Math.random() * styles.length)];
        }

        const prefixList = prefixes[selectedStyle] || prefixes.gamer;
        const suffixList = suffixes[selectedStyle] || suffixes.gamer;

        const p = prefixList[Math.floor(Math.random() * prefixList.length)];
        const s = suffixList[Math.floor(Math.random() * suffixList.length)];

        const type = Math.floor(Math.random() * 4); // 4 types of combinations

        switch (type) {
            case 0: return `${p}${base}`;
            case 1: return `${base}${s}`;
            case 2: return `${p}_${base}`;
            case 3:
                // Leetspeak possibility for gamer
                if (selectedStyle === 'gamer') return leetSpeak(`${base}${Math.floor(Math.random() * 99)}`);
                return `${base}_${s}`;
            default: return base;
        }
    }

    function leetSpeak(text) {
        return text.replace(/e/gi, '3')
            .replace(/a/gi, '4')
            .replace(/o/gi, '0')
            .replace(/i/gi, '1')
            .replace(/s/gi, '5');
    }

    async function copyToClipboard(text, element) {
        try {
            await navigator.clipboard.writeText(text);

            // Visual feedback
            const originalContent = element.innerHTML;
            element.classList.add('copied');
            element.querySelector('.copy-hint').textContent = 'Copied!';
            element.querySelector('.copy-hint').style.color = '#00ff00';

            setTimeout(() => {
                element.classList.remove('copied');
                element.querySelector('.copy-hint').textContent = 'Click to Copy';
                element.querySelector('.copy-hint').style.color = '';
            }, 1500);

        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }
});

// Add extra CSS for dynamic interactions that might be missed in initial CSS

