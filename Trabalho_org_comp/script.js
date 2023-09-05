const orgA = {
    '0110111': 4,
    '1101111': 3,
    '1100011': 3,
    '0000011': 5,
    '0100011': 4,
    '0010011': 4,
    '0110011': 4,
};

const orgB = {
    '0110111': 5,
    '1101111': 5,
    '1100011': 5,
    '0000011': 5,
    '0100011': 5,
    '0010011': 5,
    '0110011': 5,
};

function analisarDesempenho() {
    const fileInput = document.getElementById('fileInput');
    const resultElement = document.getElementById('result');
    
    const selectedFile = fileInput.files[0];
    
    if (selectedFile) {
        const reader = new FileReader();
        
        reader.onload = async function(event) {
            const text = event.target.result;
            const lines = text.trim().split('\n').reverse();
            
            let totalCyclesA = 0;
            let totalCyclesB = 0;
            let totalInstructions = 0;
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                
                if (line.length > 0) {
                    const instruction = line.substr(25, 32);
                    const orgA_cycles = orgA[instruction] || 0;
                    const orgB_cycles = orgB[instruction] || 0;
                    
                    totalCyclesA += orgA_cycles;
                    totalCyclesB += orgB_cycles;
                    totalInstructions++;
                }
            }

            const cpiA = totalCyclesA / totalInstructions;
            const cpiB = totalCyclesB / totalInstructions;

            let desempenho;
            let performanceResult = "";
            
            if (cpiA < cpiB) {
                performanceResult = "Organização A teve melhor desempenho";
                desempenho = cpiB / cpiA;
            } else if (cpiB < cpiA) {
                performanceResult = "Organização B teve melhor desempenho";
                desempenho = cpiA / cpiB;
            } else {
                performanceResult = "As organizações têm desempenho igual";
                desempenho = 0;
            }
            
            resultElement.textContent = `
                Total de instruções: ${totalInstructions}
                Total de ciclos em A: ${totalCyclesA}
                Total de ciclos em B: ${totalCyclesB}
                CPI médio em A: ${cpiA.toFixed(2)}
                CPI médio em B: ${cpiB.toFixed(2)}
                ${performanceResult}
                ${desempenho.toFixed(2)}x mais rápido
            `;
        };
        
        reader.readAsText(selectedFile);
    } else {
        resultElement.textContent = "Nenhum arquivo selecionado.";
    }
}
