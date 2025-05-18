document.addEventListener('DOMContentLoaded', () => {
    const hashInput = document.getElementById('hash-input');
    const hashBtn = document.getElementById('hash-btn');
    const hashOutput = document.getElementById('hash-output');

    // Simple MD5 hash function (credit: public domain implementation)
    function md5(str) {
        function rotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }
        function addUnsigned(lX, lY) {
            const lX4 = lX & 0x40000000;
            const lY4 = lY & 0x40000000;
            const lX8 = lX & 0x80000000;
            const lY8 = lY & 0x80000000;
            const lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            if (lX4 | lY4) {
                if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            } else return (lResult ^ lX8 ^ lY8);
        }
        const F = (x, y, z) => (x & y) | (~x & z);
        const G = (x, y, z) => (x & z) | (y & ~z);
        const H = (x, y, z) => x ^ y ^ z;
        const I = (x, y, z) => y ^ (x | ~z);

        let H0 = 0x67452301, H1 = 0xEFCDAB89, H2 = 0x98BADCFE, H3 = 0x10325476;
        const strBytes = unescape(encodeURIComponent(str));
        let buffer = new Array(64);
        let block = new Array(16);
        let i, j;

        for (i = 0; i < strBytes.length; i++) {
            j = i % 4;
            if (j === 0) block[i >> 2] = 0;
            block[i >> 2] |= strBytes.charCodeAt(i) << (j * 8);
        }
        block[i >> 2] |= 0x80 << ((i % 4) * 8);
        block[14] = strBytes.length * 8;

        for (i = 0; i < block.length; i += 16) {
            let A = H0, B = H1, C = H2, D = H3, dTemp;
            for (j = 0; j < 64; j++) {
                if (j < 16) {
                    dTemp = F(B, C, D);
                    buffer[j] = j;
                } else if (j < 32) {
                    dTemp = G(B, C, D);
                    buffer[j] = (5 * j + 1) % 16;
                } else if (j < 48) {
                    dTemp = H(B, C, D);
                    buffer[j] = (3 * j + 5) % 16;
                } else {
                    dTemp = I(B, C, D);
                    buffer[j] = (7 * j) % 16;
                }
                dTemp = addUnsigned(dTemp, addUnsigned(addUnsigned(block[buffer[j]], [0xD76AA478, 0xE8C7B756, 0x242070DB, 0xC1BDCEEE, 0xF57C0FAF, 0x4787C62A, 0xA8304613, 0xFD469501, 0x698098D8, 0x8B44F7AF, 0xFFFF5BB1, 0x895CD7BE, 0x6B901122, 0xFD987193, 0xA679438E, 0x49B40821, 0xF61E2562, 0xC040B340, 0x265E5A51, 0xE9B6C7AA, 0xD62F105D, 0x02441453, 0xD8A1E681, 0xE7D3FBC8, 0x21E1CDE6, 0xC33707D6, 0xF4D50D87, 0x455A14ED, 0xA9E3E905, 0xFCEFA3F8, 0x676F02D9, 0x8D2A4C8A, 0xFFFA3942, 0x8771F681, 0x6D9D6122, 0xFDE5380C, 0xA4BEEA44, 0x4BDECFA9, 0xF6BB4B60, 0xBEBFBC70, 0x289B7EC6, 0xEAA127FA, 0xD4EF3085, 0x04881D05, 0xD9D4D039, 0xE6DB99E5, 0x1FA27CF8, 0xC4AC5665, 0xF4292244, 0x432AFF97, 0xAB9423A7, 0xFC93A039, 0x655B59C3, 0x8F0CCC92, 0xFFEFF47D, 0x85845DD1, 0x6FA87E4F, 0xFE2CE6E0, 0xA3014314, 0x4E0811A1, 0xF7537E82, 0xBD3AF235, 0x2AD7D2BB, 0xEB86D391][j]), [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21][j]));
                D = C;
                C = B;
                B = addUnsigned(B, rotateLeft(addUnsigned(A, dTemp), [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21][j]));
                A = addUnsigned(A, dTemp);
            }
            H0 = addUnsigned(H0, A);
            H1 = addUnsigned(H1, B);
            H2 = addUnsigned(H2, C);
            H3 = addUnsigned(H3, D);
        }
        return (H0 >>> 0).toString(16).padStart(8, '0') + (H1 >>> 0).toString(16).padStart(8, '0') + (H2 >>> 0).toString(16).padStart(8, '0') + (H3 >>> 0).toString(16).padStart(8, '0');
    }

    hashBtn.addEventListener('click', () => {
        const inputText = hashInput.value.trim();
        if (inputText) {
            const hash = md5(inputText);
            hashOutput.textContent = `MD5 Hash: ${hash}`;
        } else {
            hashOutput.textContent = 'Please enter some text to hash!';
        }
    });

    hashInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') hashBtn.click();
    });
});
document.getElementById('packet-filter').addEventListener('input', (e) => {
    const filter = e.target.value.toUpperCase();
    const rows = document.querySelectorAll('#packet-output tr:not(:first-child)');
    rows.forEach(row => {
        const protocol = row.cells[2].textContent;
        row.style.display = protocol.includes(filter) || filter === '' ? '' : 'none';
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Wireshark Packet Filter
    document.getElementById('packet-filter').addEventListener('input', (e) => {
        const filter = e.target.value.toUpperCase();
        const rows = document.querySelectorAll('#packet-output tr:not(:first-child)');
        rows.forEach(row => {
            const protocol = row.cells[2].textContent;
            row.style.display = protocol.includes(filter) || filter === '' ? '' : 'none';
        });
    });

    // Nmap Scan
    document.getElementById('nmap-scan').addEventListener('click', () => {
        const output = document.getElementById('nmap-output');
        output.innerHTML = 'Scanning 192.168.1.1...<br>';
        setTimeout(() => {
            output.innerHTML += 'Port 22: Open (SSH)<br>Port 80: Open (HTTP)<br>Port 443: Closed';
        }, 1000);
    });

    // Metasploit Exploit
    document.getElementById('exploit-run').addEventListener('click', () => {
        const exploit = document.getElementById('exploit-select').value;
        const output = document.getElementById('exploit-output');
        output.innerHTML = `Running ${exploit} exploit...<br>`;
        setTimeout(() => {
            output.innerHTML += exploit === 'eternalblue' 
                ? 'Exploit successful! Gained SYSTEM access.'
                : 'Exploit successful! Extracted server keys.';
        }, 1000);
    });

    // Burp Suite Intercept
    document.getElementById('burp-intercept').addEventListener('click', () => {
        const request = document.getElementById('burp-request').value;
        const output = document.getElementById('burp-output');
        output.innerHTML = 'Intercepted Request:<br>' + request.replace(/\n/g, '<br>') + '<br><br>Response:<br>HTTP/1.1 200 OK<br>Content: Modified request sent!';
    });

    // Hash Converter (if not in a separate file)
    document.getElementById('hash-button').addEventListener('click', () => {
        const input = document.getElementById('hash-input').value;
        const type = document.getElementById('hash-type').value;
        const output = document.getElementById('hash-output');
        // Simplified hash simulation (real hashing needs a library like js-md5)
        output.textContent = `Hashed (${type}): ${input.split('').map(c => c.charCodeAt(0)).join('')}`;
    });
});