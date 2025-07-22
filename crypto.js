// Katapayadi mapping
        const katapayadi = {
            'ka': 1, 'kha': 2, 'ga': 3, 'gha': 4, 'nga': 5,
            'cha': 6, 'chha': 7, 'ja': 8, 'jha': 9, 'nja': 0,
            'ta': 1, 'tha': 2, 'da': 3, 'dha': 4, 'na': 5,
            'pa': 1, 'pha': 2, 'ba': 3, 'bha': 4, 'ma': 5,
            'ya': 1, 'ra': 2, 'la': 3, 'va': 4, 'sha': 5,
            'sa': 6, 'ha': 7, 'ksha': 8,
            // Single letters for simplified demo
            'k': 1, 'g': 3, 'c': 6, 'j': 8, 't': 1, 'd': 3, 'n': 5,
            'p': 1, 'b': 3, 'm': 5, 'y': 1, 'r': 2, 'l': 3, 'v': 4,
            's': 6, 'h': 7
        };

        const reverseKatapayadi = {};
        for (let [key, value] of Object.entries(katapayadi)) {
            if (!reverseKatapayadi[value]) {
                reverseKatapayadi[value] = [];
            }
            reverseKatapayadi[value].push(key);
        }

        function encodeKatapayadi() {
            const input = document.getElementById('ancientInput').value.toLowerCase();
            let result = '';
            let explanation = 'Encoding: ';
            
            for (let i = 0; i < input.length; i++) {
                const char = input[i];
                if (katapayadi[char] !== undefined) {
                    result += katapayadi[char];
                    explanation += `${char}→${katapayadi[char]} `;
                } else if (char.match(/[aeiou]/)) {
                    // Vowels are often ignored in Katapayadi
                    explanation += `${char}→(ignored) `;
                } else if (char === ' ') {
                    result += ' ';
                    explanation += '(space) ';
                }
            }
            
            document.getElementById('ancientResult').textContent = 
                `Numbers: ${result}\n\n${explanation}\n\nExample: "kaliyuga" → k(1) + a(ignored) + l(3) + i(ignored) + y(1) + u(ignored) + g(3) + a(ignored) = 1313\n\nThis number could represent a date, astronomical value, or coded message!`;
        }

        function decodeKatapayadi() {
            const numbers = document.getElementById('ancientInput').value.replace(/\D/g, '');
            let result = '';
            let explanation = 'Decoding: ';
            
            for (let i = 0; i < numbers.length; i++) {
                const digit = parseInt(numbers[i]);
                if (reverseKatapayadi[digit] && reverseKatapayadi[digit].length > 0) {
                    const letter = reverseKatapayadi[digit][0]; // Take first option
                    result += letter;
                    explanation += `${digit}→${letter} `;
                }
            }
            
            document.getElementById('ancientResult').textContent = 
                `Possible text: ${result}\n\n${explanation}\n\nNote: Multiple letters can map to the same number, so decoding may give various possibilities. Ancient scholars used context and meter to determine the correct interpretation.`;
        }

        // Simple encryption for demo (not actual AES, but demonstrates the concept)
        function simpleEncrypt(text, key) {
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const textChar = text.charCodeAt(i);
                const keyChar = key.charCodeAt(i % key.length);
                const encrypted = textChar ^ keyChar;
                result += encrypted.toString(16).padStart(2, '0');
            }
            return result;
        }

        function simpleDecrypt(encryptedHex, key) {
            let result = '';
            for (let i = 0; i < encryptedHex.length; i += 2) {
                const encryptedChar = parseInt(encryptedHex.substr(i, 2), 16);
                const keyChar = key.charCodeAt((i / 2) % key.length);
                const decrypted = encryptedChar ^ keyChar;
                result += String.fromCharCode(decrypted);
            }
            return result;
        }

        let lastEncryptedMessage = '';

        function encryptMessage() {
            const message = document.getElementById('modernInput').value;
            const key = document.getElementById('encryptionKey').value;
            
            if (!message || !key) {
                document.getElementById('modernResult').textContent = 'Please enter both message and key!';
                return;
            }

            lastEncryptedMessage = simpleEncrypt(message, key);
            document.getElementById('modernResult').textContent = 
                `🔒 Encrypted (XOR cipher demo):\n${lastEncryptedMessage}\n\nIn real AES encryption, this would be:\n• 128-bit block processing\n• Multiple rounds of substitution\n• Complex mathematical transformations\n• Virtually impossible to break without the key\n\nLength: ${lastEncryptedMessage.length} characters\nOriginal: ${message.length} characters`;
        }

        function decryptMessage() {
            const key = document.getElementById('encryptionKey').value;
            
            if (!lastEncryptedMessage || !key) {
                document.getElementById('modernResult').textContent = 'Please encrypt a message first!';
                return;
            }

            try {
                const decrypted = simpleDecrypt(lastEncryptedMessage, key);
                document.getElementById('modernResult').textContent = 
                    `🔓 Decrypted message:\n${decrypted}\n\n✅ Successfully decrypted using the correct key!\n\nWith wrong key, you would see gibberish. AES encryption provides even stronger security with:\n• Resistance to all known attacks\n• Used by banks, governments, and secure systems worldwide`;
            } catch (e) {
                document.getElementById('modernResult').textContent = '❌ Decryption failed! Check your key.';
            }
        }

        // Steganography functions
        let hiddenImageData = '';
        let modifiedText = '';

        function hideInImage() {
            const message = document.getElementById('stegoMessage').value;
            if (!message) {
                document.getElementById('stegoResult').textContent = 'Please enter a message to hide!';
                return;
            }

            // Simulate LSB steganography
            const binaryMessage = message.split('').map(char => 
                char.charCodeAt(0).toString(2).padStart(8, '0')
            ).join('');
            
            hiddenImageData = binaryMessage;
            
            document.getElementById('stegoResult').textContent = 
                `🎨 Message hidden in image data!\n\n` +
                `Original message: "${message}"\n` +
                `Binary representation: ${binaryMessage}\n\n` +
                `💡 In real steganography:\n` +
                `• Each bit would modify the least significant bit of pixel RGB values\n` +
                `• A 1920x1080 image can hide ~780KB of data\n` +
                `• Changes are imperceptible to human eyes\n` +
                `• Statistical analysis can sometimes detect hidden data`;
        }

        function revealFromImage() {
            if (!hiddenImageData) {
                document.getElementById('stegoResult').textContent = 'No hidden message found! Hide a message first.';
                return;
            }

            // Convert binary back to text
            let extractedMessage = '';
            for (let i = 0; i < hiddenImageData.length; i += 8) {
                const byte = hiddenImageData.substr(i, 8);
                if (byte.length === 8) {
                    extractedMessage += String.fromCharCode(parseInt(byte, 2));
                }
            }

            document.getElementById('stegoResult').textContent = 
                `🔍 Hidden message revealed!\n\n` +
                `Extracted: "${extractedMessage}"\n` +
                `Binary data: ${hiddenImageData}\n\n` +
                `✅ Message successfully extracted from image data!`;
        }

        function hideInText() {
            const coverText = document.getElementById('coverText').value;
            const secretMessage = document.getElementById('secretMsg').value;
            
            if (!coverText || !secretMessage) {
                document.getElementById('textStegoResult').textContent = 'Please enter both cover text and secret message!';
                return;
            }

            // Simple technique: use capital letters to encode binary
            const binarySecret = secretMessage.split('').map(char => 
                char.charCodeAt(0).toString(2).padStart(8, '0')
            ).join('');

            let result = '';
            let binaryIndex = 0;
            
            for (let i = 0; i < coverText.length && binaryIndex < binarySecret.length; i++) {
                const char = coverText[i];
                if (char.match(/[a-zA-Z]/)) {
                    // Use case to encode binary: uppercase = 1, lowercase = 0
                    if (binarySecret[binaryIndex] === '1') {
                        result += char.toUpperCase();
                    } else {
                        result += char.toLowerCase();
                    }
                    binaryIndex++;
                } else {
                    result += char;
                }
            }
            
            // Add remaining text unchanged
            result += coverText.substring(result.length);
            modifiedText = result;
            
            document.getElementById('textStegoResult').textContent = 
                `📄 Text with hidden message:\n\n"${result}"\n\n` +
                `💡 Encoding method: Letter case represents binary\n` +
                `• Uppercase letters = 1\n` +
                `• Lowercase letters = 0\n` +
                `Hidden "${secretMessage}" as: ${binarySecret}`;
        }

        function revealFromText() {
            if (!modifiedText) {
                document.getElementById('textStegoResult').textContent = 'No hidden message in text! Hide a message first.';
                return;
            }

            let binaryData = '';
            for (let char of modifiedText) {
                if (char.match(/[A-Z]/)) {
                    binaryData += '1';
                } else if (char.match(/[a-z]/)) {
                    binaryData += '0';
                }
            }

            let extractedMessage = '';
            for (let i = 0; i < binaryData.length; i += 8) {
                const byte = binaryData.substr(i, 8);
                if (byte.length === 8) {
                    extractedMessage += String.fromCharCode(parseInt(byte, 2));
                }
            }

            document.getElementById('textStegoResult').textContent = 
                `🔍 Secret message extracted!\n\n` +
                `Hidden message: "${extractedMessage}"\n` +
                `Binary pattern: ${binaryData}\n\n` +
                `✅ Successfully decoded from letter case pattern!`;
        }