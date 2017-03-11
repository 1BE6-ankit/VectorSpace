var row,
    columns,
    matrixData = [],
    pivotLocations = [];

row = Number(prompt("Enter number of rows"));
columns = Number(prompt("Enter number of columns"));

$(document).ready(function () {
    var tableId;
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < columns; j++) {
            //document.write(' <input type="text" placeholder="value" id="' + i + '' + j +  '"> ');
            tableId = "cell" + i + "" + j;
            //            $("#data-entry").append(" <input type='text' placeholder='" + tableId + "' id='" + t    alert(loopValue);ableId + "'>");
            $("#data-entry").append(" <input type='text' id='" + tableId + "'>");
        }
        $("#data-entry").append("</br>");
    }

    $("#evaluate").click(function () {
        matrixData = [];

        getArrayData();
        firstRowNonZero();
        firstElemZero();
        findNonZeroPivot();

        augmentedOperation();
        findPivotNumber();
        displayFinalTable();

    });

    $(".result-div").click(function () {
        $(this).remove;
    });
});

function getArrayData() {
    var tempArray, tableId, cellValue;
    for (var i = 0; i < row; i++) {
        tempArray = [];
        for (var j = 0; j < columns; j++) {
            tableId = "cell" + i + "" + j;
            cellValue = $("input[id=" + tableId + "]");
            if ((cellValue.val() == "") || isNaN(Number(cellValue.val())))
                cellValue.val(0);

            tempArray.push(parseInt($("input[id=" + tableId + "]").val()));
        }
        matrixData.push(tempArray);
    }
}

function firstRowNonZero() {
    var tempArray = [];
    var continueLoop = true,
        i = 0;

    do {
        if (matrixData[i][0] != 0) {
            tempArray = matrixData[i];
            matrixData[i] = matrixData[0];
            matrixData[0] = tempArray;
            continueLoop = false;
        }
        i++;
    } while (i < row && continueLoop);
}



function firstElemZero() {
    for (var i = 1; i < row; i++) {
        var k = matrixData[i][0] / matrixData[0][0];

        for (var j = 0; j < columns; j++) {
            matrixData[i][j] = matrixData[i][j] - k * matrixData[0][j];
        }
    }
}

function findNonZeroPivot() {
    var loopValue = (row < columns) ? row : columns;
    var nonZeroRow, tempArray = [],
        columnNumber;
    var nonZeroFlag;

    for (var i = 1; i < loopValue; i++) {
        nonZeroFlag = true;
        columnNumber = i;
        //        alert("EVALUATING: " + matrixData[i]);

        if (matrixData[i][i] == 0) {
            console.log("Non Zero Pivot at : " + matrixData[i]);
            nonZeroRow = innerRows(i + 1, columnNumber, loopValue);
            if (nonZeroRow !== 0) {
                tempArray = matrixData[i];
                matrixData[i] = matrixData[nonZeroRow];
                matrixData[nonZeroRow] = tempArray;
            } else {
                nonZeroFlag = false;
            }
        }

        if (nonZeroFlag) makeDiagonalBelowZero(i + 1, i);

    }
}

function innerRows(rowNumber, columnNumber) {
    /* this function checks whether the main diagonal has a  non-zero element
        If not, it is to be replaced by other rows    
    */

    console.log("rowNumber=" + rowNumber + "    row=" + row);
    if (rowNumber == row) {
        return 0;
    } else if (matrixData[rowNumber][columnNumber] !== 0) {
        return rowNumber;
    } else {
        return innerRows(++rowNumber, columnNumber);
    }
}

function makeDiagonalBelowZero(initialRow, initialColumn) {
    var k;
    for (var i = initialRow; i < row; i++) {
        k = matrixData[i][initialColumn] / matrixData[initialColumn][initialColumn];

        for (var j = 0; j < columns; j++) {
            matrixData[i][j] = matrixData[i][j] - k * matrixData[initialColumn][j];
        }
    }
}

function augmentedOperation() {
    var k, zeroFound, tempColumn, constant;
    var loopValue = (row < columns) ? row : columns;
    for (var i = 1; i < loopValue - 1; i++) {
        //        alert(matrixData[i][i]);
        if (matrixData[i][i] == 0) {
            tempColumn = i;
            for (var k = i; k < row - 1; k++) {
                tempColumn += 1;
                if ((matrixData[k][tempColumn] == 0) || (matrixData[k + 1][tempColumn] == 0)) {
                    (0);
                } else {
                    zeroFound = false;
                    constant = matrixData[k + 1][tempColumn] / matrixData[k][tempColumn];
                    for (var j = 0; j < columns; j++) {
                        matrixData[i + 1][j] = matrixData[i + 1][j] - constant * matrixData[i][j];
                    }
                    break;
                }
            }

        }
    }
}

function findPivotNumber() {
    var loopValue = (row < columns) ? row : columns,
        pivots = 0,
        x;

    pivotLocations = [];

    for (var i = 0; i < loopValue; i++) {
        for (var j = 0; j < columns; j++) {
            x = matrixData[i][j];
            if (x != 0) {
                ++pivots;
                pivotLocations.push(i + "" + j);
                break;
            }
        }
    }
    return pivots;
}


function printMatrix() {
    for (var i = 0; i < row; i++) {
        console.log(matrixData[i]);
    }
}

function displayFinalTable() {
    var finalTableId;
    var tableString = "";

    for (var i = 0; i < row; i++) {
        for (var j = 0; j < columns; j++) {
            //document.write(' <input type="text" placeholder="value" id="' + i + '' + j +  '"> ');
            finalTableId = "result" + i + "" + j;
            tableString += " <input type='text' value='" +
                "" + matrixData[i][j] + "' id='" + finalTableId + "'>";
        }
        tableString += "</br>";
    }
    tableString += "Rank = " + pivotLocations.length + "<br/><br/>";
    $("#final-data").append("<div class='result-div'>" + tableString + "</div>");
    $(".result-div").click(function () {
        $(this).remove();
    });


    for (var i = 0; i < pivotLocations.length; i++) {
        $("input[id=" + "result" + pivotLocations[i] + "]").addClass("makeRed");
    }

}
