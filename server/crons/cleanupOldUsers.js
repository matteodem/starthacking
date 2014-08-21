var MyCron = new Cron(60000 * 60);

MyCron.addJob(24 * 30, function() {
  var monthBefore = new Date();

  monthBefore.setMonth(now.getMonth() === 1 ? 12 : now.getMonth() - 1);

  console.log("Removing old guest accounts!");
  Accounts.removeOldGuests(monthBefore);
});
