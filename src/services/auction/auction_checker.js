function auction_tick(end_date) {
  let date = new Date();
  console.log(date.getTime());
}

function timer(auction) {
  let start_date = new Date(auction.created_at);
  let current_date = new Date();
  let end_date = start_date.getTime() + auction.max_duration_auction;
  console.log("END_DATA " + end_date);
  let times = setInterval(() => auction_tick(auction), 1000);
  setTimeout(() => {
    clearInterval(times);
  }, end_date - current_date.getTime());
}

module.exports = timer;
