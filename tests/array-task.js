// Создание двумерного массива 10x10 с случайными числами в интервале [-100..100]
function createRandomArray(rows, cols, min, max) {
    const array = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            // Генерация случайного числа в диапазоне [min, max]
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            row.push(randomNum);
        }
        array.push(row);
    }
    return array;
}

// Поиск минимального числа в массиве
function findMinNumber(array) {
    let min = array[0][0];
    let minRow = 0;
    
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] < min) {
                min = array[i][j];
                minRow = i;
            }
        }
    }
    return { min, minRow };
}

// Поиск наименьшего положительного числа в строке
function findMinPositiveInRow(row) {
    let minPositive = null;
    
    for (let num of row) {
        if (num > 0 && (minPositive === null || num < minPositive)) {
            minPositive = num;
        }
    }
    
    return minPositive;
}

// Подсчет минимального количества замен для избежания 3 одинаковых знаков подряд
function countMinReplacements(row) {
    let replacements = 0;
    let positiveCount = 0;
    let negativeCount = 0;
    
    for (let i = 0; i < row.length; i++) {
        if (row[i] > 0) {
            positiveCount++;
            negativeCount = 0;
        } else if (row[i] < 0) {
            negativeCount++;
            positiveCount = 0;
        } else {
            // Ноль сбрасывает счетчики
            positiveCount = 0;
            negativeCount = 0;
        }
        
        // Если достигли 3 одинаковых знаков подряд
        if (positiveCount >= 3 || negativeCount >= 3) {
            replacements++;
            // Сбрасываем счетчики после замены
            positiveCount = 0;
            negativeCount = 0;
        }
    }
    
    return replacements;
}

// Основная функция
function main() {
    console.log("Создание двумерного массива 10x10 с случайными числами [-100..100]:\n");
    
    // Создаем массив
    const array = createRandomArray(10, 10, -100, 100);
    
    // Находим минимальное число и его строку
    const { min, minRow } = findMinNumber(array);
    
    // Выводим массив
    console.log("Массив:");
    for (let i = 0; i < array.length; i++) {
        let rowStr = "";
        
        // Добавляем звездочку к строке с минимальным числом
        if (i === minRow) {
            rowStr += "* ";
        } else {
            rowStr += "  ";
        }
        
        // Выводим числа строки
        for (let j = 0; j < array[i].length; j++) {
            rowStr += array[i][j].toString().padStart(4) + " ";
        }
        
        // Находим наименьшее положительное число в строке
        const minPositive = findMinPositiveInRow(array[i]);
        if (minPositive !== null) {
            rowStr += ` | мин.положит.: ${minPositive}`;
        } else {
            rowStr += ` | мин.положит.: нет`;
        }
        
        // Подсчитываем минимальное количество замен
        const replacements = countMinReplacements(array[i]);
        rowStr += ` | замены: ${replacements}`;
        
        console.log(rowStr);
    }
    
    console.log(`\nМинимальное число в массиве: ${min} (строка ${minRow + 1})`);
    console.log("* - строка с минимальным числом");
}

// Запуск программы
main(); 