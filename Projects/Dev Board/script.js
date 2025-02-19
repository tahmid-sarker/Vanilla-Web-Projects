// Change background color randomly
function toggleTheme() {
    const colorOne = Math.floor(Math.random() * 256);
    const colorTwo = Math.floor(Math.random() * 256);
    const colorThree = Math.floor(Math.random() * 256);
    document.body.style.backgroundColor = `rgb(${colorOne}, ${colorTwo}, ${colorThree})`;
}

// Update current date
function updateCurrentDate() {
    const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const dateElement = document.getElementById('current-day');
    const currentDate = new Date();
    const adjustedDate = new Date(currentDate.getTime() + 6 * 60 * 60 * 1000);
    
    const dayOfWeek = weekdayNames[adjustedDate.getUTCDay()];
    const monthOfYear = monthNames[adjustedDate.getUTCMonth()];
    const dayNumber = adjustedDate.getUTCDate();
    const year = adjustedDate.getUTCFullYear();
    
    dateElement.innerHTML = `${dayOfWeek},<br><strong>${monthOfYear} ${dayNumber}, ${year}</strong>`;
}

// Set initial date and update daily
window.onload = function() {
    updateCurrentDate(); 
    setInterval(updateCurrentDate, 24 * 60 * 60 * 1000);
};

// Log task completion
function markComplete(taskElement, taskTitle) {
    const currentTime = new Date();
    const adjustedTime = new Date(currentTime.getTime() + 6 * 60 * 60 * 1000);
    
    const currentHour = adjustedTime.getUTCHours();
    const currentMinute = adjustedTime.getUTCMinutes().toString().padStart(2, '0');
    const currentSecond = adjustedTime.getUTCSeconds().toString().padStart(2, '0');
    const period = currentHour >= 12 ? 'PM' : 'AM';
    const formattedTime = `${currentHour % 12 || 12}:${currentMinute}:${currentSecond} ${period}`;
  
    const completionMessage = `You have completed ${taskTitle} at ${formattedTime}`;
    
    const taskLog = document.createElement('div');
    taskLog.className = 'bg-blue-100 p-2 rounded-lg';
    taskLog.innerHTML = `<span class="text-gray-800">${completionMessage}</span>`;
    
    const logContainer = document.getElementById('log-entries');
    logContainer.appendChild(taskLog);
  
    const taskCountElement = document.getElementById('total-tasks');
    let currentTaskCount = parseInt(taskCountElement.textContent);
    taskCountElement.textContent = (currentTaskCount + 1).toString().padStart(2, '0');
  
    const assignedTasksElement = document.getElementById('assigned-tasks');
    let currentAssignedCount = parseInt(assignedTasksElement.textContent);
    
    if (currentAssignedCount > 0) {
      assignedTasksElement.textContent = (currentAssignedCount - 1).toString().padStart(2, '0');
    }
  
    alert("Board Updated Successfully");
  
    taskElement.onclick = null;
    taskElement.classList.remove('text-white', 'bg-blue-500', 'cursor-pointer');
    taskElement.classList.add('bg-blue-500', 'opacity-20');
  
    if (currentAssignedCount - 1 === 0) {
      alert("Congratulations!!! You have completed all the current tasks");
    }
}

// Clear all log entries
function clearActivityLog() {
    const logContainer = document.getElementById('log-entries');
    logContainer.innerHTML = '';
}