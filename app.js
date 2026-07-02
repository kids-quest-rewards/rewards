// Load saved data or create default structure
function loadData() {
  const saved = localStorage.getItem('kidsQuestData');
  if (saved) {
    return JSON.parse(saved);
  }

  return {
    players: [],
    rewards: [],
    settings: {
      theme: "default",
      lastLogin: Date.now()
    }
  };
}

// Save data to localStorage
function saveData(data) {
  localStorage.setItem('kidsQuestData', JSON.stringify(data));
}

// Global app data
let appData = loadData();


// Player Management
function addPlayer(name) {
  appData.players.push({
    name,
    xp: 0,
    dailyTasks: [],
    weeklyTasks: [],
    rewardsClaimed: []
  });
  saveData(appData);
}

function addXP(playerName, amount) {
  const player = appData.players.find(p => p.name === playerName);
  if (player) {
    player.xp += amount;
    saveData(appData);
  }
}


// Reset All Data
function resetAllData() {
  localStorage.removeItem('kidsQuestData');
  appData = loadData();
}

function deleteDailyTask(playerName, taskName) {
  const player = appData.players.find(p => p.name === playerName);
  if (!player) return;

  player.dailyTasks = player.dailyTasks.filter(t => t.taskName !== taskName);
  saveData(appData);
}
