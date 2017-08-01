var counter = 0;

function AddTime(addHours, addMins, tickerHours, tickerMins)
{
    var Hours = parseInt(document.getElementById(addHours.id).value);
    var Mins = parseInt(document.getElementById(addMins.id).value);        
    var TotalHours = parseInt(document.getElementById(tickerHours.id).innerHTML);
    var TotalMins = parseInt(document.getElementById(tickerMins.id).innerHTML);
    var NotGoingToProcess = false;

    if (Hours == "" || document.getElementById(addHours.id).value == "")
        Hours = 0;
    if (Mins == "" || document.getElementById(addMins.id).value == "")
        Mins = 0;
    if (Hours == 0 && Mins == 0)
        NotGoingToProcess = true;

    if (isNaN(Hours) || isNaN(Mins))
    {
        // Tell the user they have inputted incorrectly
        NotGoingToProcess = true;
    }

    if (!NotGoingToProcess)
    {

        // Add the new minutes to the total minutes
        TotalMins = TotalMins + Mins;

        // Add the new hours to the total hours
        TotalHours = TotalHours + Hours;

        // Take the integral number if there are hours and add them to the total hours
        var hoursFromMinutes = Math.floor(TotalMins / 60);
        TotalHours = TotalHours + hoursFromMinutes;

        // How many minutes are left... and add them to the total minutes
        var remainderMins = TotalMins % 60;
        TotalMins = remainderMins;
        console.log(TotalHours + ' hrs ' + TotalMins + ' mins');
        
        // Add total times back into the fields
        document.getElementById(tickerHours.id).innerHTML = TotalHours;
        document.getElementById(tickerMins.id).innerHTML = TotalMins;

        // Add in the entry:
        // Add item row (item container)
        var itemisedTimeRow = document.createElement("div");
        itemisedTimeRow.setAttribute('ID', 'Time' + ++counter);
        itemisedTimeRow.setAttribute('Hours', Hours);
        itemisedTimeRow.setAttribute('Mins', Mins);
        itemisedTimeRow.setAttribute('class', 'time-inventory');

        // Add item time
        var itemisedTimeItem = document.createElement("div");
        itemisedTimeItem.setAttribute('class', 'time-item');
        var itemisedTimeItemNode = document.createTextNode(' + ' + Hours + ' hrs ' + Mins + ' mins');
        itemisedTimeItem.appendChild(itemisedTimeItemNode);
        itemisedTimeRow.appendChild(itemisedTimeItem);

        // Add 'subtract item row' button
        var itemisedTimeDelete = document.createElement("div");
        itemisedTimeDelete.setAttribute('class', 'time-item-delete');
        var subtractTimeIcon = document.createElement("div");
        subtractTimeIcon.setAttribute('class', 'delete-btn');
        subtractTimeIcon.setAttribute('Title', 'Delete Entry');
        subtractTimeIcon.onclick = function() { SubtractTime(itemisedTimeRow.getAttribute('ID'), tickerHours, tickerMins); }

        var itemisedTimeDeleteNode = document.createTextNode('x');
        subtractTimeIcon.appendChild(itemisedTimeDeleteNode);
        itemisedTimeDelete.appendChild(subtractTimeIcon);
        itemisedTimeRow.appendChild(itemisedTimeDelete);

        document.getElementById(itemisedTimes.id).appendChild(itemisedTimeRow);
        document.getElementById(addHours.id).focus();
        document.getElementById(addHours.id).value = "";
        document.getElementById(addMins.id).value = "";
    }
}

function SubtractTime(TimeToBeDeletedID, tickerHours, tickerMins)
{
    // Remove time
    var Hours = parseInt(document.getElementById(TimeToBeDeletedID).getAttribute('Hours'));
    var Mins = parseInt(document.getElementById(TimeToBeDeletedID).getAttribute('Mins'));  
    var TotalHours = parseInt(document.getElementById(tickerHours.id).innerHTML);
    var TotalMins = parseInt(document.getElementById(tickerMins.id).innerHTML);

    // Convert the subtract time into minutes
    var ConvertedTotalTime = (TotalHours * 60) + (TotalMins);
    TotalMins = ConvertedTotalTime - ((Hours * 60) + Mins);

    // Take the integral number if there are hours and add them to the total hours
    var hoursFromMinutes = Math.floor(TotalMins / 60);
    TotalHours = hoursFromMinutes;

    // How many minutes are left... and add them to the total minutes
    var remainderMins = TotalMins % 60;
    TotalMins = remainderMins;
    console.log(TotalHours + ' hrs ' + TotalMins + ' mins');
    
    // Add total times back into the fields
    document.getElementById(tickerHours.id).innerHTML = TotalHours;
    document.getElementById(tickerMins.id).innerHTML = TotalMins;

    // Remove element
    document.getElementById(TimeToBeDeletedID).remove();

}

function AddANote(){

}

function ExportAsCSV()
{

}

