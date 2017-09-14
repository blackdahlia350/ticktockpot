var counter = 0;
window.onload = function() {
    document.getElementById(addHours.id).focus();
    document.getElementById(addHours.id).onkeypress = function(e) { LimitImputLength(e); };
    document.getElementById(addMins.id).onkeypress = function(e){ LimitImputLength(e); }
};

function LimitImputLength (e)
{ 
    var textbox = document.getElementById(e.target.id);

    if (e.keyCode >= 35 && e.keyCode <= 39) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 45 && e.keyCode > 57)) || (e.keyCode < 96 && e.keyCode > 101)
        || (e.keyCode === 43 || e.keyCode === 45 || e.keyCode === 46 || e.keyCode === 101)) {
        e.preventDefault();
    }
    if (textbox.value.toString().length >= 3)
    {
        e.preventDefault();
    }

    // If carriage return
    if (e.keyCode == 13)
    {
        AddTime(addHours, addMins, lblTimeClock_hours, lblTimeClock_mins, itemisedTimes);
    }
}

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
        //console.log(TotalHours + ' hrs ' + TotalMins + ' mins');
        
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
        var itemisedTimeItemNode = document.createTextNode(' + ' + Hours + ' hrs\u00A0\u00A0' + Mins + ' mins');
        itemisedTimeItem.appendChild(itemisedTimeItemNode);
        itemisedTimeRow.appendChild(itemisedTimeItem);

        // Add 'subtract item row' button
        var itemisedTimeDelete = document.createElement("div");
        itemisedTimeDelete.setAttribute('class', 'time-item-delete');
        var subtractTimeIcon = document.createElement("div");
        subtractTimeIcon.setAttribute('class', 'delete-btn');
        subtractTimeIcon.setAttribute('Title', 'Delete Entry');
        subtractTimeIcon.onclick = function() { SubtractTime(itemisedTimeRow.getAttribute('ID'), tickerHours, tickerMins); }

        // Add the delete button for the entry
        var itemisedTimeDeleteNode = document.createTextNode('x');
        subtractTimeIcon.appendChild(itemisedTimeDeleteNode);
        itemisedTimeDelete.appendChild(subtractTimeIcon);
        itemisedTimeRow.appendChild(itemisedTimeDelete);

        // Add in the itemised row
        document.getElementById('itemisedTimes').appendChild(itemisedTimeRow);

        // (Re)set the textboxes
        document.getElementById(addHours.id).focus();
        document.getElementById(addHours.id).value = "";
        document.getElementById(addMins.id).value = "";

        ShowHideItemToggle();
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

    ShowHideItemToggle();
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ShowHideItemToggle()
{
    // Show up the 'View all entries' button
    var itemisedTimeDiv = document.getElementById('itemisedTimes');
    var itemCount = itemisedTimeDiv.getElementsByClassName('time-inventory').length;

    if (itemCount > 0)
    {
        document.getElementById('btnEntriesToggle').style.display = "block";
        document.getElementById('demo').className = 'collapse in';
    }
    else
    {
        document.getElementById('btnEntriesToggle').style.display = "none";
        document.getElementById('demo').className = 'collapse';
    }
    console.log('toggle triggered');
}

function AddANote() {

}

function ExportAsCSV()
{
    // Add the times into a 2D array
    var itemisedTimeDiv = document.getElementById('itemisedTimes');
    var items = document.getElementsByClassName('time-inventory');
    var itemCount = document.getElementsByClassName('time-inventory').length;

    // create the objects to store the time items
    var timeItems = [];

    for (var index = 0; index < itemCount; index++) {
        var element = items[index];
        var obj = {};
        obj["Hour"] = element.getAttribute("hours");
        obj["Mins"] = element.getAttribute("mins");
        timeItems.push(obj);
    }

    var lineArray = [];
    timeItems.forEach(function(infoArray, index){
        //console.log(toCSV(infoArray));
        var line = toCSV(infoArray);
        lineArray.push(index == 0 ? "data:text/csv;charset=utf-8\n,Hours,Mins,\n" + line : line);
    });

    var csvContent = lineArray.join("\n");
    //console.log(csvContent);

    // Prepare for download
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a")
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ItemisedTimes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    //window.open(encodedUri);
}

function toCSV(obj, separator) {
    var arr = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push(obj[key]);
        }
    }

    return arr.join(separator || ",");
}